"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import HeadContent from "../../../../components/common/HeadContent";
import SelectField from "../../../../components/common/Select";
import { StyledContentWrapper } from "../../../../styles/commons";
import { useState } from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const [selected, setSelected] = useState<any>();

  return (
    <div className="p-3">
      <HeadContent title="Dashboard"></HeadContent>

      <StyledContentWrapper>
        <SelectField
          label="hello"
          onChange={(value) => setSelected(value)}
          value={selected}
          error
          helperText="he"
          options={[
            {
              label: "hello",
              value: "hello",
            },
            {
              label: "hi",
              value: "hi",
            },
          ]}
        />
      </StyledContentWrapper>
    </div>
  );
};

export default Dashboard;
