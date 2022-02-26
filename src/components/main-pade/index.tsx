import { Button, Input, Tooltip } from "antd";
import { Card, CardBody, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, KEY_API } from "../../constants";
import { Spin } from "antd";
import RefreshFunc from "../../functoins";

function MainPage() {
  const [convert, setConvert] = useState<number | undefined>();
  const [fromVal, setFromVal] = useState<number>(1);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    setloading(true);
    axios
      .request({
        method: "GET",
        url: `${BASE_URL}/latest?apikey=${KEY_API}&base_currency=RUB`,
      })
      .then(function (response) {
        setConvert(response?.data?.data["USD"]);
        setloading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [RefreshFunc(loading)]);

  return (
    <Spin spinning={loading} delay={500}>
      <div className="">
        You can get the latest and real information about the currency through
        this app. Currency information on this site is updated every minute
        <div className="input-group row  mt-3">
          <div className="col-md-4 mb-2 ">
            <Card>
              <CardBody>
                <h4 className="m-0">RUB</h4>
                <Label>Russian Ruble</Label>
                <Input
                  type={"number"}
                  value={fromVal}
                  onChange={(e) => setFromVal(Number(e.target.value))}
                />
              </CardBody>
            </Card>
          </div>
          <div className="col-md-4 mb-2 ">
            <Card>
              <CardBody>
                <h4 className="m-0">USD</h4>
                <Label>US Dollar</Label>
                <Input
                  value={Number(fromVal * Number(convert)).toFixed(5)}
                  type={"number"}
                />
              </CardBody>
            </Card>
          </div>
          <div className="col-md-3 mb-2 d-flex align-items-end">
            <Tooltip title="Click here to learn more about the currency">
              <Link to="/more-valyuta">
                <Button type="primary">See more</Button>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </Spin>
  );
}
export default MainPage;
