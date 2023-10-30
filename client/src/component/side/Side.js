import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Menu } from "antd";
import "./side.scss";
import icon from "./icon/Vector (1).png";
import { server_url } from "../../Config";

function Side({ onTimeSelect }) {
  const [timeIntervals, setTimeIntervals] = useState([]);
  const [error, setError] = useState();
  const noRender = useRef(false);

  useEffect(() => {
    if (!noRender.current) {
      axios
        .get(server_url + "getintervals", {
          headers : {"ngrok-skip-browser-warning": "69420",}
        })
        .then((res) => {
          setTimeIntervals(res.data);
        })
        .catch((e) => {
          // console.log(e);
          setError("Oops! couldn't fetch timeline. Try again later.");
        });
      noRender.current = true;
    }
  }, []);

  const handleTimeClick = (time) => {
    onTimeSelect(time);
  };

  return (
    <>
      <div className="timeicon">
        <img src={icon} alt="" className="clockicon" />
        <span>Time</span>
      </div>
      <hr className="hrline" />
      <div className="timeline">
        <Menu theme="dark">
          {timeIntervals.map((time) => (
            <Menu.Item
              key={time}
              onClick={() => {
                handleTimeClick(time);
              }}
            >
              {`${time.split(":")[0]}h:${time.split(":")[1]}m:0s`}
            </Menu.Item>
          ))}
        </Menu>

        {error && <p className="errorClass">{error}</p>}
      </div>
    </>
  );
}

export default Side;
