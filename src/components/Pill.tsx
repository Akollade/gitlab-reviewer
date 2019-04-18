import React, { Component } from 'react';

interface Props {
    text: string | number;
    type: "success" | "danger" | "disable";
}

class Pill extends Component<Props> {
  private getStyleFromType() {
    const { type } = this.props;
    
    switch (type) {
        case "success":{
            return "bg-green hover:bg-green-dark text-white";
        }
        case "danger":{
            return "bg-red hover:bg-red-dark text-white";
        }
        case "disable":{
            return "bg-grey hover:bg-grey-dark text-white";
        }
        default:{
            return "bg-grey hover:bg-grey-dark text-white";
        }
    }
  }

  public render() {
    let { text } = this.props;
    
    return (
        <div className={"font-bold h-8 w-8 rounded-full flex items-center justify-center " + this.getStyleFromType()}>
          <p>{text}</p>
        </div>
    );
  }
}

export default Pill;
