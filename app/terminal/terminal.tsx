import React from 'react';
import { LazyLog } from 'react-lazylog';

export interface TerminalProps extends React.DOMAttributes<{}> {
  options?: any;
  value?: string;
}

export default class TerminalComponent extends React.Component<TerminalProps> {
  container: HTMLDivElement;
  constructor(props?: TerminalProps, context?: any) {
    super(props, context);
  }

  render() {
    return <div className="terminal">
      <LazyLog
        selectableLines={false}
        caseInsensitive={true}
        lineClassName="terminal-line"
        rowHeight={20}
        height={'auto'}
        follow={true}
        style={{ backgroundColor: 'unset' }}
        text={this.props.value} />
    </div>
  }
}
export { TerminalComponent };
