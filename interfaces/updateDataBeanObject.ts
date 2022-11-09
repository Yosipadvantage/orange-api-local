export interface BeanUpdateDBI {
    "ClassForName"?: string,
    "IDDataBeanInfo": number | null,
    "IDSoftwareModule": number,
    "Description": string,
    "IDDaoInfo": number,
    "State": string,
    "DataBeanTable": string,
    "Since"?: string,
    "URL": string,
    "Name": string
}
export interface BeanUpdateDataBeanField {
    "IDDataBeanField": number,
    "IDDataBeanInfo": number,
    "Description": string,
    "Since": string,
    "Code": number,
    "IDAccount": number,
    "Name": string
}
export interface BeanUpdateDataBeanQuery {
    "IDDataBeanInfo": number,
    "Description": string,
    "IDDataBeanQuery": number | null,
    "Since"?: string,
    "MethodName": string,
    "SQLQuery": string,
    "IDAccount": number | null
}

export interface BeanUpdateDataBeanProperty {
    "ClassForName": string,
    "IDDataBeanProperty": number | null,
    "Description": string,
    "DBForeignColumnName": string,
    "DBDataType": string,
    "DBType": number,
    "Name": string,
    "DBLength": number,
    "PropertyIsNotNull": boolean,
    "TableKey": boolean,
    "DBScale": number,
    "IDDataBeanInfo": number,
    "PropertyDefaultValue": string,
    "DBForeignTableName": string
}
