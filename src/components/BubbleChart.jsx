import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import Modal from './IssueModal';
import PropTypes from 'prop-types';

export default class BubbleChart extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    useLabels: PropTypes.bool
};

  static defaultProps = {
    data: [],
    useLabels: true,
    width: 800,
    height: 800
  };

  constructor(props) {
    super(props);

    this.minValue = 1;
    this.maxValue = 100;
    this.mounted = false;

    this.state = {
      data: [],
      isModalOpen: false,
      modalData: { key: '', label: '', v: 0, issues: [] }
    };

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.minValue =
        0.95 *
        d3.min(this.props.data, item => {
          return item.v;
        });

      this.maxValue =
        1.05 *
        d3.max(this.props.data, item => {
          return item.v;
        });

      this.simulatePositions(this.props.data);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleClick = project => {
    this.setState({
      isModalOpen: true,
      modalData: project
    })
  }

  // close modal (set isModalOpen, true)
  closeModal() {
    this.setState({
      isModalOpen: false
    })
  }

  // open modal (set isModalOpen, false)
  openModal() {
    this.setState({
      isModalOpen: true
    })
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .range([1, 50])
      .domain([this.minValue, this.maxValue]);

    return fx(value);
  };

  simulatePositions = data => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.5)
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05))
      .force(
        "collide",
        d3.forceCollide(d => {
          return (this.radiusScale(d.v) + 2) * 3;
        })
      )
      .on("tick", () => {
        if (this.mounted) {
          this.setState({ data });
        }
      });
  };

  renderBubbles = data => {
    const minValue =
      0.95 *
      d3.min(data, item => {
        return item.v;
      });

    const maxValue =
      1.05 *
      d3.max(data, item => {
        return item.v;
      });

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      .range(["#eb001b", "#f79e1b"]);

    // render simple circle element
    if (!this.props.useLabels) {
      const circles = _.map(data, (item, index) => {
        return (
          <circle
            key={index}
            r={this.radiusScale(item.v) * 3}
            cx={item.x}
            cy={item.y}
            fill={color(item.v)}
            stroke={d3.rgb(color(item.v)).brighter(2)}
            strokeWidth="2"
          />
        );
      });

      return (
        <g
          transform={`translate(${this.props.width / 2}, ${this.props
            .height / 2})`}
        >
          {circles}
        </g>
      );
    }

    // render circle and text elements inside a group
    const texts = _.map(data, (item, index) => {
      const props = this.props;
      const fontSize = this.radiusScale(item.v) / 2;

      return (
        <g
          key={index}
          transform={`translate(${props.width / 2 +
            item.x}, ${props.height / 2 + item.y})`}
        >
          <circle
            r={this.radiusScale(item.v) * 3}
            fill={color(item.v)}
            stroke={d3.rgb(color(item.v)).brighter(2)}
            strokeWidth="2"
            onClick={() => this.handleClick(item)}
          />
          <text
            dy="6"
            fill="#fff"
            textAnchor="middle"
            fontSize={`${fontSize}px`}
            fontWeight="bold"
            onClick={() => this.handleClick(item)}
          >
            {`${item.key}:\n
                      ${item.v}`}
          </text>
        </g>
      );
    });

    return texts;
  };

  render() {
    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0,0.5)'
      }
    };

    const mainStyle = {
      app: {
        margin: '120px 0'
      },
      button: {
        backgroundColor: '#408cec',
        border: 0,
        padding: '12px 20px',
        color: '#fff',
        margin: '0 auto',
        width: 150,
        display: 'block',
        borderRadius: 3
      }
    };
    if (this.state.data.length) {
      return (
        <div>
          <svg width={this.props.width} height={this.props.height}>
            {this.renderBubbles(this.state.data)}
          </svg>
          <Modal
            isModalOpen={this.state.isModalOpen}
            closeModal={this.closeModal}
            style={modalStyle}>

            <div>{`Issues for ${this.state.modalData.key}:`}</div>
            <ul>
              {this.state.modalData.issues.map(({ node }) => {
                return <li key={node.title}><a href={node.url}>{node.title}</a></li>
              })}
            </ul>
            <button style={{
              ...mainStyle.button,
              margin: 0,
              width: 'auto',
              marginTop: 10
            }} onClick={this.closeModal}>Close</button>

          </Modal>
        </div>
      );
    }

    return <div>Loading</div>;
  }
}
