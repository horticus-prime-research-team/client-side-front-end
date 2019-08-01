import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import MoistureStream from '../components/moistureStream';

describe("MoistureStream component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MoistureStream />, div);
  });

  it("renders moisture data as expected", () => {
    const app = global.shallow(<MoistureStream />);

    expect(app.find("section").exists()).toBeTruthy();
  });

  it("renders headings 'Moisture Number' and 'Moisture Status' as expected", () => {
    const app = global.shallow(<MoistureStream />);

    expect(app.find("h2").exists()).toBeTruthy();
  });

  it("renders a legend of moisture values as expected", () => {
    const app = global.shallow(<MoistureStream />);

    expect(app.find("p").exists()).toBeTruthy();
  });

  it("renders a color moisture indicator", () => {
    const app = global.shallow(<MoistureStream />);

    expect(app.find("div").exists()).toBeTruthy();
  });

  //Simulate color to value
  function colorShift(value) {
    MoistureStream.moistureNumber = value;
  }
  //Test component that uses the hook
  function EffectComponent() {
    const moistStream = MoistureStream();
    return <span>{moistStream}</span>
  }

  it("renders a color moisture indicator as per the logic in useEffect", () => {
    const { container, rerender } = render(<EffectComponent />)
    const span = container.firstChild

    colorShift(149)
    rerender(<EffectComponent />)
    expect(span.textContent).toBe('Moisture Number: 0Moisture Status: dryLegend: 0 - 299 Dry, 300 - 599 Moist, 600+ Wet')
    
    colorShift(200)
    rerender(<EffectComponent />)
    expect(span.textContent).toBe('Moisture Number: 0Moisture Status: dryLegend: 0 - 299 Dry, 300 - 599 Moist, 600+ Wet')

    colorShift(300)
    rerender(<EffectComponent />)
    expect(span.textContent).toBe('Moisture Number: 0Moisture Status: dryLegend: 0 - 299 Dry, 300 - 599 Moist, 600+ Wet')
  });
});
