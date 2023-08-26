import React, {useRef, useState} from 'react';
import TopUserInterface from "@/pages/UserInterface/Analysis/components/TopUserInterface";
import {Card} from "antd";
import {PageContainer} from "@ant-design/pro-components";


const AnalysisIndex: React.FC = () => {

  return (
    <PageContainer title="接口调用分析">
      <Card>
        <TopUserInterface>

        </TopUserInterface>
      </Card>
    </PageContainer>

  );
};

export default AnalysisIndex;
