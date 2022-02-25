import { useEffect, useState } from "react";
import {
  ArrowRightOutlined,
  LeftCircleOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Input, Select, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import axios from "axios";
import { BASE_URL, KEY_API } from "../../constants";
import RefreshFunc from "../../functoins";

const { Option } = Select;

type convertType = {
  fromType: string;
  toType: string;
};

type currentType = {
    [key:string]: number;
}

const MoreInfoComp = () => {
  const history = useHistory();
  const [fromVal, setFromVal] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [convertNumber, setConvertNumber] = useState<number | undefined>();
  const [currenceList, setCurrenceList] = useState<currentType>();
  const [convertChange, setConvertChange] = useState<convertType>({
    fromType: "RUB",
    toType: "USD",
  });

  useEffect(() => {
    if (convertChange.fromType) {
      setLoading(true);
      axios
        .request({
          method: "GET",
          url: `${BASE_URL}/latest?apikey=${KEY_API}&base_currency=${convertChange.fromType}`,
        })
        .then(function (response) {
          setCurrenceList(response?.data?.data);
          setConvertNumber(response?.data?.data[convertChange.toType]);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [convertChange.fromType, RefreshFunc(loading)]);

  useEffect(() => {
    if (currenceList) {
      setConvertNumber(currenceList[convertChange.toType]);
    }
  }, [convertChange.toType, convertChange.fromType]);


  return (
    <Spin spinning={loading}>
      <div>
        <div className="d-flex align-items-center justify-content-start ">
          <span
            className="d-flex align-items-center pointer justify-content-start back-button"
            onClick={() => history.goBack()}
          >
            <LeftCircleOutlined className="me-2" />
            Go to back
          </span>
        </div>
        <hr />
        <div className="input-group row  my-3">
          <div className="col-md-5 col-lg-4 ">
            <Card>
              <CardBody>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="m-0">{convertChange.fromType}</h4>
                    {/* <Label className="lebel-line">
                        {currenceList[convertChange.fromType]?.currencyName}
                    </Label> */}
                  </div>
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    style={{ width: "150px" }}
                    onChange={(e) =>
                      setConvertChange({
                        fromType: e,
                        toType: convertChange.toType,
                      })
                    }
                    value={convertChange.fromType}
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {currenceList &&
                      Object.keys(currenceList)?.map((item, index) => (
                        <Option key={index} value={item}>
                          {item}
                        </Option>
                      ))}
                  </Select>
                </div>
                <Input
                  className="mt-2"
                  type={"number"}
                  value={fromVal}
                  onChange={(e) => setFromVal(Number(e.target.value))}
                />
              </CardBody>
            </Card>
          </div>
          <div className="col-md-1 my-3 d-flex align-items-center justify-content-center">
            <SwapOutlined
              onClick={() =>
                setConvertChange({
                  toType: convertChange.fromType,
                  fromType: convertChange.toType,
                })
              }
              className="swap-icon"
            />
          </div>
          <div className="col-md-5 col-lg-4 ">
            <Card>
              <CardBody>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="m-0">{convertChange.toType}</h4>
                    {/* <Label className="lebel-line">
                        {currenceList[convertChange.toType]?.currencyName}
                    </Label> */}
                  </div>
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    style={{ width: "150px" }}
                    onChange={(e) =>
                      setConvertChange({
                        fromType: convertChange.fromType,
                        toType: e,
                      })
                    }
                    value={convertChange.toType}
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {currenceList &&
                      Object.keys(currenceList)?.map((item, index) => (
                        <Option key={index} value={item}>
                          {item}
                        </Option>
                      ))}
                  </Select>
                </div>
                <Input
                  className="mt-2"
                  type={"number"}
                  value={Number(fromVal * Number(convertNumber)).toFixed(5)}
                />
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="row content-page-two">
          {currenceList &&
            Object.keys(currenceList)?.map((item: any, index: number) => {
              return (
                <div className="col-md-6">
                  <Card className="mt-2 list-hover" key={index} onClick={() =>
                      setConvertChange({
                        fromType: convertChange.fromType,
                        toType: item,
                      })
                    }>
                    <CardBody>
                      <div className="d-flex align-items-center justify-content-start">
                        <span className="m-0 h6">
                          {fromVal + " " + convertChange.fromType}
                        </span>
                        <ArrowRightOutlined className="mx-4 marginn" />
                        <span className="m-0 h6">
                          {" "}
                          {Number(fromVal * currenceList[item]).toFixed(5) +
                            " " +
                            item}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </Spin>
  );
};
export default MoreInfoComp;
