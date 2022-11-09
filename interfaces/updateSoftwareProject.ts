export interface BeanUpdateSoftPro {
    "EndingDate": string,
    "JarFilesDirectory": string,
    "Description": string,
    "UseEnclosingPackage": boolean,
    "JavaSDKDirectory": string,
    "IDAccount"?: number,
    "InitDate": string,
    "EnclosingPackageName": string,
    "Name": string,
    "State": number,
    "OutputFileDirectory": string,
    "Since"?: string,
    "IDSoftwareProject"?: number,
    "SourceFileDirectory": string


}
export interface BeanUpdateSoftMod {
    "MediaFile"?: string,
    "EndingDate": string,
    "FinalPackageName"?: string,
    "Description": string,
    "IDDataBase"?: number,
    "PackageName": string,
    "IDAccount"?: number,
    "InitDate": string,
    "WebAppDeploymentName"?: string,
    "ApacheManager"?: string,
    "Name": string,
    "IDSoftwareModule": number | null,
    "State": number,
    "Since"?: string,
    "IDSoftwareProject": number,
    "TableMnemonic": string,
    "ApacheManagerURL": string | null
}

export interface BeanUpdateProMemb {
    "IDProjectMember": number | null,
    "IDSoftwareModule": number,
    "EndingDate": string,
    "State": number,
    "Since"?: string,
    "IDAccount": number,
    "InitDate": string
}
