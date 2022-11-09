export interface ReaspNameLike {
    DataBeanProperties: ReaspNameLikeDataBeanProperties;
    DataBeanName: string;
}

export interface ReaspNameLikeDataBeanProperties {
    Type: number;
    ObjectValue: ObjectValue[];
    ClassName: string;
    Date: Date;
}

export interface ObjectValue {
    DataBeanProperties: DataBeanMethod;
    DataBeanName: string;
}

export interface DataBeanMethod {
    Description: null;
    WebServiceInfo: string;
    Method: string;
    Json: string;
    IDWebServiceInfo: number;
    ReturnType: string;
    Hash: string;
    DaoInfo: null;
    URL: null;
    Rmi: null;
    IDDataBeanInfo: number;
    State: string;
    IDDataBeanMethod: number;
    WebServiceAdapter: string;
    Since: Date;
    DeprecatedDate: null;
    Parametters: any;
}
