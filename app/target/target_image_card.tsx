import React from 'react';

import { build_event_stream } from '../../proto/build_event_stream_ts_proto';

interface State {
  img: build_event_stream.File[];
  imgSrc: string[];
}

interface Props {
  files: build_event_stream.File[],
}

export default class ImageCardComponent extends React.Component {
  props: Props;
  state: State = {
    img: [],
    imgSrc: [],
  }

  componentWillMount() {
    this.setState({
      img: this.props.files.filter(file => (/\.(gif|jpe?g|png|webp|svg)$/i).test(file.name)),
    });
  }

  componentDidMount() {
    this.state.img.forEach(i => this.fetchImg(i));
  }

  fetchImg(besFile: build_event_stream.File) {
    let req = new XMLHttpRequest();
    let component = this;
    let uri = `/results/file/download?filename=${besFile.name}&bytestream_url=${encodeURIComponent(besFile.uri)}`
    let reader = new FileReader();
    let fileExt = besFile.name.split(".")[1];
    let mime = '';

    if (fileExt === 'svg') {
      mime = 'image/svg+xml';
    } else {
      mime = `image/${fileExt}`;
    }

    req.open('GET', uri, true);

    req.responseType = "blob"

    reader.addEventListener("load", function() {
      component.setState({
        imgSrc: [...component.state.imgSrc, reader.result]
      });
    }, false);

    req.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // We're creating a new blob because the MIME type needs to be replaced
        // as it is set to 'application/octet-stream' which wouldn't display
        // properly in the <img> tag.
        reader.readAsDataURL(new Blob([this.response], { type: mime }));
      } else {
        console.error("Error loading graph!");
      }
    };

    req.onerror = function() {
      console.error("Error loading graph!");
    }

    req.send();
  }

  render() {
    return <div className="card artifacts">
      <img className="icon" src="/results/image/arrow-down-circle.svg" />
      <div className="content">
        <div className="title">Graphs</div>
          <div className="details">
            {this.state.imgSrc.map(i =>
            <div className="artifact-name">
              <img className="artifact-graph" src={i} />
            </div>)}
          </div>
          {this.state.imgSrc.length == 0 && <span>No graphs</span>}
      </div>
    </div>
  }
}
