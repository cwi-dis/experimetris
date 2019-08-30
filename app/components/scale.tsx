import * as React from "react";
import { randomId, Range } from "../util";

interface ScaleProps {
  min: number;
  max: number;
  value: number;
  labels?: Array<string>;
  onChange: (value: number) => void;
}

const Scale: React.FC<ScaleProps> = (props) => {
  const { min, max, value, labels, onChange } = props;
  const baseId = `radio-${randomId()}`;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 7 }}>
        <span>{(labels && labels.length > 0) ? labels[0] : null}</span>
        <span>{(labels && labels.length > 1) ? labels[1] : null}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {Range(min, max + 1).map((n) => {
          return (
            <div key={n}>
              <input
                type="radio"
                id={`${baseId}-${n}`}
                onChange={onChange.bind(null, n)}
                checked={value === n}
              />
              <div style={{ textAlign: "center", marginTop: 7 }}>
                <label htmlFor={`${baseId}-${n}`}>{n}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scale;
