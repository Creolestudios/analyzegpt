import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Collapse, Checkbox, Button, Spin, Radio, Empty } from "antd";
import axios from "axios";
import "./content.scss";
import icon from "./icon/Vector.png";
import { server_url } from "../../Config";
import { useDraggable } from "react-use-draggable-scroll";
import { faL } from "@fortawesome/free-solid-svg-icons";

function MainContent({ selectedTime }) {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [challengesLoading, setChallengesLoading] = useState(false);
  const [keywordLoading, setKeywordLoading] = useState(false);
  const [situationData, setSituationData] = useState([]);
  const [challengesData, setChallengesData] = useState([]);
  const [activeKey, setActiveKey] = useState();
  const [error, setError] = useState();
  const [accordianError, setAccordianError] = useState();
  const [riskData, setRiskData] = useState([]);
  const [impactData, setImpactData] = useState([]);
  const [solutionData, setSolutionData] = useState([]);

  const noRender = useRef(false);
  const ref = useRef();
  const { events } = useDraggable(ref);

  const onChangeAcc = (key) => {
    setActiveKey(key);
  };

  const onChange = (checkedValues) => {
    setSelectedKeywords(checkedValues);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAccordianError("");
    await axios
      .post(server_url + "situations", selectedKeywords)
      .then((res) => {
        if (res.data.situations.length === 0) {
          setAccordianError(
            "No situations found. Please select other keywords."
          );
        } else {
          setSituationData(res.data.situations);
          setLoading(false);
          setActiveKey(1);
        }
      })
      .catch((e) => {
        setAccordianError("No situations found. Please select other keywords.");
        setLoading(false);
      });
  };

  const handleSituationChange = async (e) => {
    const selectedValue = e.target.value;
    console.log(e.target.value);
    // Make axios call with selectedValue
    setLoading(true);
    setAccordianError("");
    await axios
      .post(server_url + "challenges", { explanation: selectedValue })
      .then((res) => {
        if (res.data.challenges.length === 0) {
          setAccordianError(
            "No challenges found. Please select other situation."
          );
          setLoading(false);
        } else {
          setChallengesData(res.data.challenges);
          setLoading(false);
          setActiveKey(2);
        }
      })
      .catch((e) => {
        setAccordianError(
          "No challenges found. Please select other situation."
        );
        setLoading(false);
      });
  };

  const handleChallengesChange = async (e) => {
    const selectedChallenge = e.target.value;
    setLoading(true);
    setAccordianError("");
    await axios
      .post(server_url + "risks", { challenge: selectedChallenge })
      .then((res) => {
        if (res.data.risks.length === 0) {
          setAccordianError("No risks found. Please select other challenge.");
          setLoading(false);
        } else {
          setRiskData(res.data.risks);
          setLoading(false);
          setActiveKey(3);
        }
      })
      .catch((e) => {
        setAccordianError("No risks found. Please select other challenge.");
        setLoading(false);
      });
  };

  const handleRiskChange = async (e) => {
    const selectedRisk = e.target.value;
    setLoading(true);
    setAccordianError("");
    await axios
      .post(server_url + "impactsolution", { risk: selectedRisk })
      .then((res) => {
        if (
          res.data.impactsolution.impacts.length === 0 ||
          res.data.impactsolution.solutions.length === 0
        ) {
          setAccordianError(
            "No impact or solution found. Please select other risk."
          );
          setLoading(false);
        } else {
          setImpactData(res.data.impactsolution.impacts);
          setSolutionData(res.data.impactsolution.solutions);
          console.log(res.data);
          setLoading(false);
          setActiveKey(4);
        }
      })
      .catch((e) => {
        setAccordianError(
          "No impact or solution found. Please select other risk."
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedTime) {
      setKeywordLoading(true);
      setSituationData();
      setChallengesData();
      setRiskData();
      setImpactData();
      setSolutionData();
      setActiveKey(0);
      setError();
      setAccordianError()

      axios
        .post(server_url + "listkeywords/" + selectedTime)
        .then((res) => {
          if(res.data?.keywords == "" || res.data?.keywords == undefined){
            setOptions([])
            setAccordianError(res.data)
            setKeywordLoading(false)
          }else{
            setOptions(res.data.keywords);
            setKeywordLoading(false);
          }
        })

        .catch((e) => {
          // console.log(e);
          setError("No keywords found. Try again later.");
          setKeywordLoading(false);
        });

      noRender.current = true;
    }
  }, [selectedTime]);

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "Situations",
      children: (
        <div>
          {situationData && (
            <Radio.Group onChange={handleSituationChange}>
              {situationData.map((situation) => (
                <div key={situation}>
                  <Radio value={situation.explanation}>
                    {situation.explanation}
                  </Radio>
                  <br />
                </div>
              ))}
            </Radio.Group>
          )}
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: "Challenges",
      children: (
        <div>
          {challengesData && (
            <Radio.Group onChange={handleChallengesChange}>
              {challengesData.map((challenges) => (
                <div key={challenges}>
                  <Radio value={challenges}>{challenges}</Radio>
                  <br />
                </div>
              ))}
            </Radio.Group>
          )}
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: "Risk",
      children: (
        <div>
          {riskData && (
            <Radio.Group onChange={handleRiskChange}>
              {riskData.map((risks) => (
                <div key={risks}>
                  <Radio value={risks}>{risks}</Radio>
                  <br />
                </div>
              ))}
            </Radio.Group>
          )}
        </div>
      ),
      style: panelStyle,
    },

    {
      key: "4",
      label: "Impact",
      children: (
        <div>
          {impactData &&
            impactData.map((impacts) => {
              return (
                <div key={impacts}>
                  <p>{impacts}</p>
                </div>
              );
            })}
        </div>
      ),
      style: panelStyle,
    },

    {
      key: "5",
      label: "Solution",
      children: (
        <div>
          {solutionData &&
            solutionData.map((solutions) => {
              return (
                <div key={solutions}>
                  <p>{solutions}</p>
                </div>
              );
            })}
        </div>
      ),
      style: panelStyle,
    },
  ];

  const panelStyle = {
    marginTop: 10,
    border: "none",
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    width: "100%",
    maxHeight: 432,
  };

  return (
    <>
      <Row className="keywordscol">
        <Col span={24}>
          <div className="keywordtitle">
            <img src={icon} alt="" className="hashicon" />
            <span>Keywords</span>
          </div>
          <hr className="hrline" />
          <Spin spinning={keywordLoading}>
            <div className="keywordclass">
              <div className="checkboxclass" ref={ref} {...events}>
                {options && (
                  <Checkbox.Group
                    options={options}
                    onChange={onChange}
                    className="options"
                  />
                )}
              </div>

              {options.length > 0 && (
                <Button
                  type="primary"
                  size="small"
                  onClick={handleSubmit}
                  className="submitkeywords"
                >
                  Submit
                </Button>
              )}

              {error && <p className="errorClass">{error}</p>}
            </div>
          </Spin>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Spin spinning={loading}>
            <Collapse
              // className="panelStyle"
              accordion
              items={getItems(panelStyle)}
              bordered={false}
              expandIconPosition="end"
              activeKey={activeKey}
              onChange={onChangeAcc}
            />
          </Spin>
          {accordianError && <p className="errorClass">{accordianError}</p>}
        </Col>
      </Row>
    </>
  );
}

export default MainContent;
