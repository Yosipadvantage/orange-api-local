import { Observable } from "rxjs";
import api from '../axios-api'
import {
    BeanUpdateSoftMod,
    BeanUpdateSoftPro,
    BeanUpdateProMemb,
    BeanUpdateDaoInfo,
    BeanUpdateDBI,
    BeanUpdateDataBeanField,
    BeanUpdateDataBeanQuery,
    BeanUpdateDataBeanProperty,

} from "../../interfaces";

export class GlobalService {

    private url: string = "/jsserver";

    public login(username: string, password: string) {
        const dataObj = {
            "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
            "ServiceName": "OrangeBase",
            "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
            "MethodHash": "com.advantage.bean.account.WorkSession_validateWorkSession_String_String_String_String_String_String",
            "ArgumentList": [
                null,
                username,
                password,
                null,
                null,
                null
            ]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);

    }

    //DATA BASE
    public getDataBaseCatalog(IDDataBase: number | null): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataBaseCatalog_Number",
            "ArgumentList": [
                IDDataBase
            ]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }


    public updateDataBase(
        Description: string,
        IDDataBase: number | null,
        Port: number,
        URL: string,
        Name: string,
        DBPassword: string,
        DBName: string,
        Destinity: string,
        DBUser: string
    ): Observable<any> {

        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dao.DataBase_updateDataBase_com.advantage.bean.dao.DataBase",
            "ArgumentList": [{
                "DataBeanProperties": {
                    Description,
                    IDDataBase,
                    Port,
                    URL,
                    Name,
                    DBPassword,
                    DBName,
                    Destinity: Destinity === "true" ? true : false,
                    DBUser
                },
                "DataBeanName": "com.advantage.bean.dao.DataBase"
            }]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }


    public deleteDataBase(IDDataBase: any): Observable<any> {

        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteDataBase_com.advantage.bean.dao.DataBase",
            "ArgumentList": [{
                "DataBeanProperties": {
                    "IsAutoCommit": null,
                    "Description": null,
                    "IDDataBase": IDDataBase,
                    "MediaContext": null,
                    "Port": null,
                    "Service": null,
                    "DBType": null,
                    "URL": null,
                    "Name": null,
                    "Type": null,
                    "DBPassword": null,
                    "State": null,
                    "DBName": null,
                    "Destinity": null,
                    "Since": null,
                    "DBUser": null
                },
                "DataBeanName": "com.advantage.bean.dao.DataBase"
            }]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }


    // WEB SERVICE
    public getWebServiceInfoCatalog(): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getWebServiceInfoCatalog_Number", "ArgumentList": [null]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getDataBeanMethod(idWebServiceInfo: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataBeanMethod_Number_Number_String",
            "ArgumentList": [
                idWebServiceInfo,
                null,
                null
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }


    public parseAppDeploymentStructureFor(Name: string, classforName: string, description: string): Observable<any> {
        const dataObjt = {

            "ServiceName": "OrangeService",
            "MethodHash": "Boolean_parseAppDeploymentStructureFor_String_String_String",
            "ArgumentList": [
                Name,
                classforName,
                description
            ]
        }

        const data = JSON.stringify(dataObjt);
        return api.post(this.url, data);
    }


    public parseAppDeploymentStructureForUpdate(Name: string, description: string): Observable<any> {
        const dataObjt = {

            "ServiceName": "OrangeService",
            "MethodHash": "Boolean_parseAppDeploymentStructureFor_String_String_String",
            "ArgumentList": [
                14,
                Name,
                description
            ]
        }

        const data = JSON.stringify(dataObjt);
        return api.post(this.url, data);
    }


    public deleteWebServiceInfo = (idWebServiceInfo: number) => {
        const dataObjt = {

            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteWebServiceInfo_Number",
            "ArgumentList": [
                idWebServiceInfo
            ]

        }

        const data = JSON.stringify(dataObjt);
        return api.post(this.url, data);
    }


    //SOFTWARE PROJECT
    public getSoftwareProjectCatalog(): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getSoftwareProjectCatalog_Number",
            "ArgumentList": [
                null
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getSoftwareProject(idSoftwareProject: number) {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.SoftwareProject_getSoftwareProject_Number",
            "ArgumentList": [
                idSoftwareProject
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public updateSoftwareProject(bean: BeanUpdateSoftPro): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.SoftwareProject_updateSoftwareProject_com.advantage.bean.dev.SoftwareProject",
            "ArgumentList": [
                {
                    "DataBeanProperties": bean,
                    "DataBeanName": "com.advantage.bean.dev.SoftwareProject"
                }
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public deleteSoftwareProject(idSoftwareProject: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteSoftwareProject_Number",
            "ArgumentList": [idSoftwareProject]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    //SOFTWARE PROJECT - MODULES
    public getSoftwareModuleCatalog(idSoftwareProject: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getSoftwareModuleCatalog_Number",
            "ArgumentList": [
                idSoftwareProject
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public buildDaoInfo(idDaoInfo: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getSoftwareModuleCatalog_Number",
            "ArgumentList": [
                idDaoInfo
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public buildAppDeployment(idSoftwareModule: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "int_buildAppDeployment_Number",
            "ArgumentList": [
                idSoftwareModule
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public createJar(idSoftwareModule: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "String_createJar_Number",
            "ArgumentList": [idSoftwareModule]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public buildAll(idSoftwareModule: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_buildAll_Number",
            "ArgumentList": [idSoftwareModule]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public updateSoftwareModule(bean: BeanUpdateSoftMod): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.SoftwareModule_updateSoftwareModule_com.advantage.bean.dev.SoftwareModule",
            "ArgumentList": [
                {
                    "DataBeanProperties": bean,
                    "DataBeanName": "com.advantage.bean.dev.SoftwareModule"
                }
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public deleteSoftwareModule(idSoftwareModule: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteSoftwareModule_Number",
            "ArgumentList": [idSoftwareModule]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    //SOFTWARE PROJECT - MEMBERS
    public getProjectMemberCatalog(idSoftwareModule: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getProjectMemberCatalog_Number",
            "ArgumentList": [idSoftwareModule]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public updateProjectMember(bean: BeanUpdateProMemb): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.ProjectMember_updateProjectMember_com.advantage.bean.dev.ProjectMember",
            "ArgumentList": [
                {
                    "DataBeanProperties": bean,
                    "DataBeanName": "com.advantage.bean.dev.ProjectMember"
                }
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public deleteProjectMember(idProjectMember: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteProjectMember_Number",
            "ArgumentList": [idProjectMember]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    //DAO
    public getDaoInfoCatalogBySoftwareModule(idSoftwareModule: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDaoInfoCatalogBySoftwareModule_Number",
            "ArgumentList": [idSoftwareModule]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public updateDaoInfo(bean: BeanUpdateDaoInfo): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.DaoInfo_updateDaoInfo_com.advantage.bean.dev.DaoInfo",
            "ArgumentList": [
                {
                    "DataBeanProperties": bean,
                    "DataBeanName": "com.advantage.bean.dev.DaoInfo"
                }
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public deleteDaoInfo(idDaoInfo: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteDaoInfo_Number",
            "ArgumentList": [idDaoInfo]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    //DATA-BEAN-OBJECT
    public getDataBeanInfoByDaoInfo(idDaoInfo: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataBeanInfoByDaoInfo_Number",
            "ArgumentList": [idDaoInfo]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public updateDataBeanInfo(bean: BeanUpdateDBI): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.DataBeanInfo_updateDataBeanInfo_com.advantage.bean.dev.DataBeanInfo",
            "ArgumentList": [
                {
                    "DataBeanProperties": bean,
                    "DataBeanName": "com.advantage.bean.dev.DataBeanInfo"
                }
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public deleteDataBeanInfo(idDataBeanInfo: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteDataBeanInfo_Number",
            "ArgumentList": [idDataBeanInfo]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getDataBeanFieldCatalog(IDDataBeanInfo: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataBeanFieldCatalog_Number",
            "ArgumentList": [IDDataBeanInfo]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public updateDataBeanField(bean: BeanUpdateDataBeanField): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.DataBeanField_updateDataBeanField_com.advantage.bean.dev.DataBeanField",
            "ArgumentList": [
                {
                    "DataBeanProperties": bean,
                    "DataBeanName": "com.advantage.bean.dev.DataBeanField"
                }
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public deleteDataBeanField(idDataBeanField: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteDataBeanField_Number",
            "ArgumentList": [idDataBeanField]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getDataBeanQueryCatalog(idDataBeanInfo: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataBeanQueryCatalog_Number",
            "ArgumentList": [idDataBeanInfo]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public updateDataBeanQuery(bean: BeanUpdateDataBeanQuery): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.DataBeanQuery_updateDataBeanQuery_com.advantage.bean.dev.DataBeanQuery",
            "ArgumentList": [{
                "DataBeanProperties": bean,
                "DataBeanName": "com.advantage.bean.dev.DataBeanQuery"
            }]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public deleteDataBeanQuery(idDataBeanQuery: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteDataBeanQuery_Number",
            "ArgumentList": [idDataBeanQuery]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getDataBeanPropertyCatalog(IDDataBeanInfo: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataBeanPropertyCatalog_Number",
            "ArgumentList": [IDDataBeanInfo]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public updateDataBeanProperty(bean: BeanUpdateDataBeanProperty): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.DataBeanProperty_updateDataBeanProperty_com.advantage.bean.dev.DataBeanProperty",
            "ArgumentList": [
                {
                    "DataBeanProperties": bean,
                    "DataBeanName": "com.advantage.bean.dev.DataBeanProperty"
                }
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public deleteDataBeanProperty(idDataBeanProperty: number): Observable<any> {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "void_deleteDataBeanProperty_Number",
            "ArgumentList": [idDataBeanProperty]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getJavaDataType() {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getJavaDataType_String",
            "ArgumentList": [
                null
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getDataTypeListByDBType(classForName: string) {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataTypeListByDBType_Number_String",
            "ArgumentList": [
                0,
                classForName
            ]
        }
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getDataBeanInfoByPattern(idSoftwareProject: number, pattern: string) {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataBeanInfoByPattern_Number_String",
            "ArgumentList": [
                idSoftwareProject,
                pattern
            ]
        }

        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }


    public addDataBeanPropertyForeignKey(IDDataBeanInfo: number, IDDataBeanProperty: number, asociarLlave: string) {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "com.advantage.bean.dev.DataBeanProperty_addDataBeanPropertyForeignKey_Number_Number_String",
            "ArgumentList": [
                IDDataBeanInfo,
                IDDataBeanProperty,
                asociarLlave
            ]
        }


        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

    public getDataBeanPropertyPrimaryKey(idDataBeanInfo: number) {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getDataBeanPropertyPrimaryKey_Number",
            "ArgumentList": [
                idDataBeanInfo
            ]
        }

        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }


    public getAccountByNit(cedula: number) {
        const dataObj = {
            "ServiceName": "OrangeService",
            "MethodHash": "java.util.List_getAccountByNit_Number",
            "ArgumentList": [
                cedula
            ]
        }

        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }

}
