import { Button, Grid, Input, Table, Textarea } from '@nextui-org/react';
import { BiEdit, BiTrash, BiPlusCircle, BiCheckCircle, BiXCircle, BiShapeCircle, BiData, BiDesktop, BiDownArrowAlt, BiCodeBlock, BiGroup } from "react-icons/bi";
import { Modal } from "@nextui-org/react";
import { GlobalService } from '../../api/services/GlobalService';
import { context } from "../context/providerSpinner";
import { useEffect, useState, useContext, ReactNode } from "react";
import toast from 'react-hot-toast';
import { BeanUpdateSoftPro } from '../../interfaces';
const services = new GlobalService();

const SoftwareProject = () => {

    //REMPLAZAR POR LOS DATOS REALES DEL SERVICIO
    const [listSoftwareProjectCatalog, setListSoftwareProjectCatalog] = useState<any>([]);
    const [listSofwareModulo, setListSofwareModulo] = useState<any>([]);
    const [listProjectMember, setListProjectMember] = useState<any>([]);
    const [listDataBaseCatalog, setListDataBaseCatalog] = useState<any>([]);
    const [valuesSoftwareProject, setValuesSoftwareProject] = useState({ Name: "", SourceFileDirectory: "", InitDate: "", OutputFileDirectory: "", EndingDate: "", JavaSDKDirectory: "", State: "", JarFilesDirectory: "", UseEnclosingPackage: false, EnclosingPackageName: "", Description: "" });
    const [valuesSoftwareModule, setValuesSoftwareModule] = useState({ Name: "", DataBase: "", IDDataBase: 0, InitDate: "", PackageName: "", EndingDate: "", State: "", TableMnemonic: "", Description: "" });
    const [valuesProjectMember, setvaluesProjectMember] = useState({ cedula: "", resultado: "", IDAccount: 0, initDate: "", endingDate: "", state: "" });
    const [modalVisibleSofwareProject, setModalVisibleSoftwareProject] = useState(false);
    const [modalVisibleSofwareModule, setModalVisibleSoftwareModule] = useState(false);
    const [modalVisibleProjectMember, setModalVisibleProjectMember] = useState(false);
    const [vistaModalSofwareProject, setVistaModalSofwareProject] = useState(false);
    const [vistaModalSofwareModule, setVistaModalSofwareModule] = useState(false);
    const [vistaModalProjectMember, setVistaModalProjectMember] = useState(false);
    const [id_SoftwareProject, setId_SoftwareProject] = useState(0);
    const [id_SoftwareModule, setId_SoftwareModule] = useState(0);
    const [id_ProjectMember, setId_ProjectMember] = useState(0);
    const { setState }: any = useContext(context);
    const [optionSubmitSoftwareProject, setOptionSubmitSoftwareProject] = useState(false);
    const [optionSubmitSoftwareModule, setOptionSubmitSoftwareModule] = useState(false);
    const [optionSubmitProjectMember, setOptionSubmitProjectMember] = useState(false);
    const [estadosMenu, setEstadoMenu] = useState([true, false, false]);
    const [nameProject, setNameProject] = useState("");
    const [mostrarListaDataBase, setMostrarListaDataBase] = useState("none");



    //ESTE SERVICIO LLAMA LOS DATOS DE LA SECCION SOFTWARE_PROJECT
    const getSoftwareProjectCatalog = () => {
        setState(true);
        services.getSoftwareProjectCatalog().subscribe((res: any) => {
            setState(false);
            setListSoftwareProjectCatalog(res.DataBeanProperties.ObjectValue.map((item: any) => {
                return item.DataBeanProperties
            }));
        })
    }

    const getSoftwareProject = (idSoftwareProject: number) => {
        services.getSoftwareProject(idSoftwareProject).subscribe((res: any) => {
            if (res.DataBeanProperties.ObjectValue) {
                setNameProject(res.DataBeanProperties.ObjectValue.DataBeanProperties.Name);
            } else {
                toast.error("No se puedo obtener el nombre del proyecto");

            }
        })
    }

    const getDataBaseCatalog = () => {
        services.getDataBaseCatalog(null).subscribe((res: any) => {
            if (res.DataBeanProperties.ObjectValue.length) {
                setListDataBaseCatalog(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties;
                }))
            }
        })
    }

    /*    const getDataBaseCatalogForId = (IDDataBase: number) => {
           setState(true);
           services.getDataBaseCatalog(IDDataBase).subscribe((res: any) => {
               setState(false);
               if (res.DataBeanProperties.ObjectValue.length) {
                   setDataBaseCatalog(res.DataBeanProperties.ObjectValue[0].DataBeanProperties.Name);
               }
           })
       }
    */

    useEffect(() => {
        getSoftwareProjectCatalog();
        getDataBaseCatalog();
    }, []);




    const closeHandler = () => {
        setModalVisibleSoftwareProject(false);
        setId_SoftwareProject(0);
        setValuesSoftwareProject({ Name: "", SourceFileDirectory: "", InitDate: "", OutputFileDirectory: "", EndingDate: "", JavaSDKDirectory: "", State: "", JarFilesDirectory: "", UseEnclosingPackage: false, EnclosingPackageName: "", Description: "" });
    };

    const closeHandlerSoftwareModule = () => {
        setModalVisibleSoftwareModule(false);
        setValuesSoftwareModule({ Name: "", DataBase: "", IDDataBase: 0, InitDate: "", PackageName: "", EndingDate: "", State: "", TableMnemonic: "", Description: "" })
    };

    const closeHandlerProjectMember = () => {
        setModalVisibleProjectMember(false);
        setvaluesProjectMember({ cedula: "", resultado: "", IDAccount: 0, initDate: "", endingDate: "", state: "" });
    }


    const closeModalDeleteSofwareProject = () => {
        setVistaModalSofwareProject(false);
        setId_SoftwareProject(0);
    }

    const closeModalDeleteSofwareModule = () => {
        setVistaModalSofwareModule(false);
        setId_SoftwareModule(0);
    }

    const closeModalDeleteProjectMember = () => {
        setVistaModalProjectMember(false);
        setId_ProjectMember(0);
    }



    const mostrarModalForEditar = (fila: BeanUpdateSoftPro) => {
        setModalVisibleSoftwareProject(true);
        const formatDateInitDate = new Date(fila.InitDate).getFullYear() + "-" + (new Date(fila.InitDate).getMonth() + 1 < 10 ? "0" : "") + (new Date(fila.InitDate).getMonth() + 1) + "-" + (Number(new Date(fila.InitDate).getDate()) < 10 ? "0" : "") + new Date(fila.InitDate).getDate();
        const formatDateEndingDate = new Date(fila.EndingDate).getFullYear() + "-" + (new Date(fila.EndingDate).getMonth() + 1 < 10 ? "0" : "") + (new Date(fila.EndingDate).getMonth() + 1) + "-" + (Number(new Date(fila.EndingDate).getDate()) < 10 ? "0" : "") + new Date(fila.EndingDate).getDate();
        setValuesSoftwareProject({ ...fila, State: fila.State.toString(), InitDate: formatDateInitDate, EndingDate: formatDateEndingDate });
    }


    //ELIMINAR UN SOFWARE PROJECT
    const eliminarSoftwareProject = () => {
        services.deleteSoftwareProject(id_SoftwareProject).subscribe((res) => {
            getSoftwareProjectCatalog();
            closeModalDeleteSofwareProject();
            toast.success("Eliminado con exito");
        })
    }


    //ELIMINAR UN SOFWARE MODULE
    const eliminarSoftwareModule = () => {
        setState(true);
        services.deleteSoftwareModule(id_SoftwareModule).subscribe((res) => {
            setState(false);
            closeModalDeleteSofwareModule();
            getSoftwareModule(id_SoftwareProject);
            toast.success("Eliminado con exito");
        })
    }


    //ELIMINAR UN PROJECT MEMBER
    const eliminarProjectMember = () => {
        setState(true);
        services.deleteProjectMember(id_ProjectMember).subscribe((res) => {
            closeModalDeleteProjectMember();
            member(id_SoftwareModule);
            toast.success("Eliminado con exito");
        })
    }


    const actionMostrarListaDataBase = () => {
        if (mostrarListaDataBase === "none") {
            setMostrarListaDataBase("flex");
        } else {
            setMostrarListaDataBase("none");
        }
    }



    //CONTROLA ACCIONES DEL MODAL DEL SOFTWARE PROJECT
    const hanldeSubmitSoftwareProject = (e: any) => {
        e.preventDefault();
        if (optionSubmitSoftwareProject) {
            crearSofwareProject();
        } else {
            editarSofwareProject();
        }
    }




    //CREAR SOFTWARE_PROJECT
    const crearSofwareProject = async () => {

        if (valuesSoftwareProject.Name && valuesSoftwareProject.SourceFileDirectory && valuesSoftwareProject.InitDate && valuesSoftwareProject.OutputFileDirectory && valuesSoftwareProject.EndingDate && valuesSoftwareProject.JavaSDKDirectory && valuesSoftwareProject.State && valuesSoftwareProject.JarFilesDirectory && valuesSoftwareProject.EnclosingPackageName) {
            setState(true);
            const bean = {
                Name: valuesSoftwareProject.Name,
                SourceFileDirectory: valuesSoftwareProject.SourceFileDirectory,
                InitDate: valuesSoftwareProject.InitDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                OutputFileDirectory: valuesSoftwareProject.OutputFileDirectory,
                EndingDate: valuesSoftwareProject.EndingDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                JavaSDKDirectory: valuesSoftwareProject.JavaSDKDirectory,
                State: Number(valuesSoftwareProject.State),
                JarFilesDirectory: valuesSoftwareProject.JarFilesDirectory,
                UseEnclosingPackage: valuesSoftwareProject.UseEnclosingPackage,
                EnclosingPackageName: valuesSoftwareProject.EnclosingPackageName,
                Description: valuesSoftwareProject.Description
            }

            services.updateSoftwareProject(bean).subscribe((res) => {
                setState(false);
                if (res.DataBeanProperties.ObjectValue) {
                    getSoftwareProjectCatalog();
                    closeHandler();
                    toast.success("Se creo correctamente");
                } else {
                    toast.error("Ocurrio un error inesperado");
                }
            })
        } else {
            toast.error("LLena todos los campos por favor");
        }
    }




    //EDITAR SOFTWARE_PROJECT
    const editarSofwareProject = async () => {
        if (valuesSoftwareProject.Name && valuesSoftwareProject.SourceFileDirectory && valuesSoftwareProject.InitDate && valuesSoftwareProject.OutputFileDirectory && valuesSoftwareProject.EndingDate && valuesSoftwareProject.JavaSDKDirectory && valuesSoftwareProject.State && valuesSoftwareProject.JarFilesDirectory && valuesSoftwareProject.EnclosingPackageName) {
            setState(true);
            const bean = {
                Name: valuesSoftwareProject.Name,
                SourceFileDirectory: valuesSoftwareProject.SourceFileDirectory,
                InitDate: valuesSoftwareProject.InitDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                OutputFileDirectory: valuesSoftwareProject.OutputFileDirectory,
                EndingDate: valuesSoftwareProject.EndingDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                JavaSDKDirectory: valuesSoftwareProject.JavaSDKDirectory,
                State: Number(valuesSoftwareProject.State),
                JarFilesDirectory: valuesSoftwareProject.JarFilesDirectory,
                UseEnclosingPackage: valuesSoftwareProject.UseEnclosingPackage,
                EnclosingPackageName: valuesSoftwareProject.EnclosingPackageName,
                IDSoftwareProject: id_SoftwareProject,
                Description: valuesSoftwareProject.Description
            }

            services.updateSoftwareProject(bean).subscribe((res) => {
                setState(false);
                if (res.DataBeanProperties.ObjectValue) {
                    getSoftwareProjectCatalog();
                    closeHandler();
                    toast.success("Se creo correctamente");
                } else {
                    toast.error("Ocurrio un error inesperado");
                }
            })
        } else {
            toast.error("LLena todos los campos por favor");
        }
    }






    //------- ACCIONES QUE TRAE LOS DATOS DE LA SEGUNDA TABLA ------------//
    const getSoftwareModule = (id_SoftwareProject: number) => {
        setState(true);
        getSoftwareProject(id_SoftwareProject);
        services.getSoftwareModuleCatalog(id_SoftwareProject).subscribe((res) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue.length) {
                setEstadoMenu([true, true, false]);
                setListSofwareModulo(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties
                }));
            } else {
                toast.error("Ocurrio un error inesperado");
            }
        })
    }




    //CONTROLA ACCIONES DEL MODAL DEL SOFTWARE MODULE
    const handleSubmitSoftwareModule = (e: any) => {
        e.preventDefault();
        if (optionSubmitSoftwareModule) {
            crearSoftwareModule();
        } else {
            editarSoftwareModule();
        }
    }





    //CONTROLA ACCIONES DEL MODAL DEL SOFTWARE MODULE
    const crearSoftwareModule = () => {
        const bean = {
            EndingDate: valuesSoftwareModule.EndingDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            Description: valuesSoftwareModule.Description,
            PackageName: valuesSoftwareModule.PackageName,
            InitDate: valuesSoftwareModule.InitDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            Name: valuesSoftwareModule.Name,
            IDSoftwareModule: null,
            State: Number(valuesSoftwareModule.State),
            IDSoftwareProject: id_SoftwareProject,
            TableMnemonic: valuesSoftwareModule.TableMnemonic,
            IDDataBase: valuesSoftwareModule.IDDataBase,
            ApacheManagerURL: null,
        }
        services.updateSoftwareModule(bean).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                getSoftwareModule(id_SoftwareProject);
                toast.success("Se creo correctamente");
                closeHandlerSoftwareModule();

            } else {
                toast.error("Hubo un error inesperado");
            }
        })
    }


    const editarSoftwareModule = () => {
        const bean = {
            EndingDate: valuesSoftwareModule.EndingDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            Description: valuesSoftwareModule.Description,
            PackageName: valuesSoftwareModule.PackageName,
            InitDate: valuesSoftwareModule.InitDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            Name: valuesSoftwareModule.Name,
            IDSoftwareModule: id_SoftwareModule,
            State: Number(valuesSoftwareModule.State),
            IDSoftwareProject: id_SoftwareProject,
            TableMnemonic: valuesSoftwareModule.TableMnemonic,
            IDDataBase: valuesSoftwareModule.IDDataBase,
            ApacheManagerURL: null,
        }
        services.updateSoftwareModule(bean).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                getSoftwareModule(id_SoftwareProject);
                toast.success("Se creo correctamente");
                closeHandlerSoftwareModule();

            } else {
                toast.error("Hubo un error inesperado");
            }
        })
    }


    const resetValoresEditar = (item: any) => {

        //FUNCION PARA DEVOLVER EL NOMBRE DEL DATABEAN POR MEDIO DEL ID
        const dataBase = listDataBaseCatalog.map((i: any) => {
            if (i.IDDataBase === item.IDDataBase) {
                return i.Name;
            }
        })
        const formatDataBase = dataBase.filter((i: any) => i);

        //FUNCION PARA FORMATEAR LA FECHA QUE LLEGA DE LA API Y HACERLA LEGIBLE EN EL FORMULARIO CUANDO ACTUALICE
        const formatDateInitDate = new Date(item.InitDate).getFullYear() + "-" + (new Date(item.InitDate).getMonth() < 10 ? "0" : "") + (new Date(item.InitDate).getMonth() + 1) + "-" + (Number(new Date(item.InitDate).getDate()) < 10 ? "0" : "") + new Date(item.InitDate).getDate();
        const formatDateEndingDate = new Date(item.EndingDate).getFullYear() + "-" + (new Date(item.EndingDate).getMonth() < 10 ? "0" : "") + (new Date(item.EndingDate).getMonth() + 1) + "-" + (Number(new Date(item.EndingDate).getDate()) < 10 ? "0" : "") + new Date(item.EndingDate).getDate();


        //ESTADO QUE RESETEA LOS VALORES DE LOS INPUTS CON LOS DATOS DE LA FILA 
        setValuesSoftwareModule({ ...item, DataBase: formatDataBase[0], InitDate: formatDateInitDate, EndingDate: formatDateEndingDate });


    }


    const member = (IDSoftwareModule: number) => {
        setState(true);
        setEstadoMenu([true, true, true]);
        services.getProjectMemberCatalog(IDSoftwareModule).subscribe((res: any) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue.length) {
                setListProjectMember(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties
                }))
            } else {
                setListProjectMember([]);
                toast("No tiene datos");
            }
        })
    }


    const getAccountByNit = () => {
        setState(true);
        services.getAccountByNit(Number(valuesProjectMember.cedula)).subscribe((res: any) => {
            setState(false);
            console.log("resss", res);
            if (res.DataBeanProperties.ObjectValue.length) {
                if (res.DataBeanProperties.ObjectValue[0].DataBeanProperties.Name1 === " ") {
                    setvaluesProjectMember({ ...valuesProjectMember, resultado: res.DataBeanProperties.ObjectValue[0].DataBeanProperties.Surname1, IDAccount: res.DataBeanProperties.ObjectValue[0].DataBeanProperties.IDAccount });
                } else {
                    setvaluesProjectMember({ ...valuesProjectMember, resultado: res.DataBeanProperties.ObjectValue[0].DataBeanProperties.Name1, IDAccount: res.DataBeanProperties.ObjectValue[0].DataBeanProperties.IDAccount });
                }
            } else {
                toast.error("No existe ese usuario");
                setvaluesProjectMember({ ...valuesProjectMember, resultado: "" });
            }
        })
    }



    const handleSubmitProjectMember = (e: any) => {
        e.preventDefault();
        if (optionSubmitProjectMember) {
            crearProjectMember();
        } else {
            editarProjectMember();
        }

    }

    const crearProjectMember = () => {
        if (valuesProjectMember.endingDate && valuesProjectMember.state && valuesProjectMember.IDAccount) {
            const bean = {
                "IDProjectMember": null,
                "IDSoftwareModule": id_SoftwareModule,
                "EndingDate": valuesProjectMember.endingDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                "State": Number(valuesProjectMember.state),
                "IDAccount": valuesProjectMember.IDAccount,
                "InitDate": valuesProjectMember.initDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`
            }
            services.updateProjectMember(bean).subscribe((res) => {
                if (res.DataBeanProperties.ObjectValue.DataBeanProperties) {
                    member(id_SoftwareModule);
                    closeHandlerProjectMember()
                    toast.success("Se creo correctamente");
                } else {
                    toast.error("Hubo un error inesperado");
                }

            })
        } else {
            toast.error("Por favor llenar los campos");
        }
    }

    const editarProjectMember = () => {

        if (valuesProjectMember.endingDate && valuesProjectMember.state && valuesProjectMember.IDAccount) {
            const bean = {
                "IDProjectMember": id_ProjectMember,
                "IDSoftwareModule": id_SoftwareModule,
                "EndingDate": valuesProjectMember.endingDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                "State": Number(valuesProjectMember.state),
                "IDAccount": valuesProjectMember.IDAccount,
                "InitDate": valuesProjectMember.initDate += ` ${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`
            }
            services.updateProjectMember(bean).subscribe((res) => {
                if (res.DataBeanProperties.ObjectValue.DataBeanProperties) {
                    member(id_SoftwareModule);
                    closeHandlerProjectMember()
                    toast.success("Se actualizo correctamente");
                } else {
                    toast.error("Hubo un error inesperado");
                }

            })
        } else {
            toast.error("Por favor llenar los campos");
        }
    }




    const resetValoresProjectMember = (item: any) => {
        const formatDateInitDate = new Date(item.InitDate).getFullYear() + "-" + (new Date(item.InitDate).getMonth() + 1 < 10 ? "0" : "") + (new Date(item.InitDate).getMonth() + 1) + "-" + (Number(new Date(item.InitDate).getDate()) < 10 ? "0" : "") + new Date(item.InitDate).getDate();
        const formatDateEndingDate = new Date(item.EndingDate).getFullYear() + "-" + (new Date(item.EndingDate).getMonth() + 1 < 10 ? "0" : "") + (new Date(item.EndingDate).getMonth() + 1) + "-" + (Number(new Date(item.EndingDate).getDate()) < 10 ? "0" : "") + new Date(item.EndingDate).getDate();

        setvaluesProjectMember({
            ...valuesProjectMember,
            endingDate: formatDateEndingDate,
            initDate: formatDateInitDate,
            IDAccount: item.IDAccount,
            state: item.State
        })
    }




    return (
        <>
            <section className='container-buttons'>
                <div>
                    {/* VISTA DE BOTON CREAR PARA CADA TABLA */}
                    {estadosMenu[0] && !estadosMenu[1] && <Button onClick={() => { setModalVisibleSoftwareProject(true); setOptionSubmitSoftwareProject(true) }} css={{ fontSize: "18px", paddingRight: "10px", margin: "10px 0px" }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>}
                    {estadosMenu[1] && !estadosMenu[2] && <Button onClick={() => { setModalVisibleSoftwareModule(true); setOptionSubmitSoftwareModule(true) }} css={{ fontSize: "18px", paddingRight: "10px", margin: "10px 0px" }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>}
                    {estadosMenu[2] && <Button onClick={() => { setModalVisibleProjectMember(true); setOptionSubmitProjectMember(true) }} css={{ fontSize: "18px", paddingRight: "10px", margin: "10px 0px" }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>}
                </div>
                <div>
                    <Button.Group size="xs">
                        <button className={estadosMenu[0] ? "btn-menu" : "btn-menu-disable"} disabled={estadosMenu[0] ? false : true} onClick={() => { setEstadoMenu([true, false, false]) }}>Software Project</button>
                        <button className={estadosMenu[1] ? "btn-menu" : "btn-menu-disable"} disabled={estadosMenu[1] ? false : true} onClick={() => { setEstadoMenu([true, true, false]) }}>Software Module</button>
                        <button className={estadosMenu[2] ? "btn-menu" : "btn-menu-disable"} disabled={estadosMenu[2] ? false : true}>Project Member</button>
                    </Button.Group>
                </div>
            </section>

            {estadosMenu[0] && !estadosMenu[1] &&

                <Table css={{ height: "auto", minWidth: "100%" }}>
                    <Table.Header>
                        <Table.Column css={{ fontSize: "16px" }}>Name</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>Description</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>InitDate</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>EndingDate</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>State</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>UseEnclosingPackage</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>EnclosingPackageName</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>SourceFileDirectory</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>OutputFileDirectory</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>JavaSDKDirectory</Table.Column>
                        <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {listSoftwareProjectCatalog.map((item: any, index: number) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{item.Name}</Table.Cell>
                                    <Table.Cell>{item.Description}</Table.Cell>
                                    <Table.Cell>{item.InitDate}</Table.Cell>
                                    <Table.Cell>{item.EndingDate}</Table.Cell>
                                    <Table.Cell>{item.State}</Table.Cell>
                                    <Table.Cell>{item.UseEnclosingPackage ? "SI" : "NO"}</Table.Cell>
                                    <Table.Cell>{item.EnclosingPackageName}</Table.Cell>
                                    <Table.Cell>{item.SourceFileDirectory}</Table.Cell>
                                    <Table.Cell>{item.OutputFileDirectory}</Table.Cell>
                                    <Table.Cell>{item.JavaSDKDirectory}</Table.Cell>
                                    <Table.Cell>
                                        <div>
                                            <button className='btn-table' onClick={() => { getSoftwareModule(item.IDSoftwareProject); setId_SoftwareProject(item.IDSoftwareProject) }} ><BiShapeCircle color='white' style={{ display: "block" }} /></button>
                                            <button className='btn-table' onClick={() => { mostrarModalForEditar(item); setId_SoftwareProject(item.IDSoftwareProject); setOptionSubmitSoftwareProject(false) }} ><BiEdit color='white' style={{ display: "block" }} /></button>
                                            <button className='btn-table' onClick={() => { setVistaModalSofwareProject(true); setId_SoftwareProject(item.IDSoftwareProject) }} ><BiTrash color='white' style={{ display: "block" }} /></button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            }
            {estadosMenu[0] && estadosMenu[1] && !estadosMenu[2] &&

                <>
                    <h5>PROYECTO:  <strong style={{ color: "orange" }}>{nameProject}</strong></h5>
                    <Table css={{ height: "auto", minWidth: "100%" }}>
                        <Table.Header>
                            <Table.Column css={{ fontSize: "16px" }}>ID</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Name</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Description</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Tag de Tablas</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>InitDate</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>EndingDate</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>State</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>PackageName</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>FinalPackageName</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>DataBase</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {listSofwareModulo.map((item: any, index: number) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{item.IDSoftwareModule}</Table.Cell>
                                        <Table.Cell>{item.Name}</Table.Cell>
                                        <Table.Cell>{item.Description}</Table.Cell>
                                        <Table.Cell>{item.TableMnemonic}</Table.Cell>
                                        <Table.Cell>{item.InitDate}</Table.Cell>
                                        <Table.Cell>{item.EndingDate}</Table.Cell>
                                        <Table.Cell>{item.State}</Table.Cell>
                                        <Table.Cell>{item.PackageName}</Table.Cell>
                                        <Table.Cell>{item.FinalPackageName}</Table.Cell>
                                        <Table.Cell>{listDataBaseCatalog.map((i: any) => {
                                            if (i.IDDataBase === item.IDDataBase) {
                                                return i.Name
                                            }
                                        })
                                        }</Table.Cell>
                                        <Table.Cell>
                                            <div>
                                                <button className='btn-table' onClick={() => { alert("Funcion Compile") }} ><BiCodeBlock color='white' style={{ display: "block" }} /></button>
                                                <button className='btn-table' onClick={() => { member(item.IDSoftwareModule); setId_SoftwareModule(item.IDSoftwareModule) }} ><BiGroup color='white' style={{ display: "block" }} /></button>
                                                <button className='btn-table' onClick={() => { setId_SoftwareModule(item.IDSoftwareModule); setModalVisibleSoftwareModule(true); resetValoresEditar(item); setOptionSubmitSoftwareModule(false) }} ><BiEdit color='white' style={{ display: "block" }} /></button>
                                                <button className='btn-table' onClick={() => { setId_SoftwareModule(item.IDSoftwareModule); setVistaModalSofwareModule(true) }} ><BiTrash color='white' style={{ display: "block" }} /></button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </>
            }


            {estadosMenu[2] &&

                <>
                    <h5>PROYECTO:  <strong style={{ color: "orange" }}>{nameProject}</strong></h5>
                    <Table css={{ height: "auto", minWidth: "100%" }}>
                        <Table.Header>
                            <Table.Column css={{ fontSize: "16px" }}>ID</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Miembro</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>InitDate</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>EndingDate</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>State</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {listProjectMember.map((item: any, index: number) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{item.IDProjectMember}</Table.Cell>
                                        <Table.Cell>No asignado</Table.Cell>
                                        <Table.Cell>{item.InitDate}</Table.Cell>
                                        <Table.Cell>{item.EndingDate}</Table.Cell>
                                        <Table.Cell>{item.State}</Table.Cell>
                                        <Table.Cell>
                                            <div>
                                                <button className='btn-table' onClick={() => { setModalVisibleProjectMember(true); setOptionSubmitProjectMember(false); setId_ProjectMember(item.IDProjectMember); resetValoresProjectMember(item) }} ><BiEdit color='white' style={{ display: "block" }} /></button>
                                                <button className='btn-table' onClick={() => { setId_ProjectMember(item.IDProjectMember); setVistaModalProjectMember(true) }} ><BiTrash color='white' style={{ display: "block" }} /></button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </>
            }


            {/* MODAL DE CREAR Y EDITAR DE LA TABLA -1 */}

            <Modal
                closeButton
                open={modalVisibleSofwareProject}
                onClose={closeHandler}
                css={{ padding: "20px", textAlign: "left" }}
            >
                <form onSubmit={hanldeSubmitSoftwareProject}>
                    <h2>{optionSubmitSoftwareProject ? "Crear" : "Editar"}</h2>
                    <Grid.Container gap={1}>
                        <Grid sm={6}>
                            <Input label="Name" value={valuesSoftwareProject.Name} onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, Name: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input maxLength={8} value={valuesSoftwareProject.SourceFileDirectory} label="SourceFileDirectory" onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, SourceFileDirectory: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="InitDate" value={valuesSoftwareProject.InitDate} type="date" onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, InitDate: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="OutputFileDirectory" value={valuesSoftwareProject.OutputFileDirectory} onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, OutputFileDirectory: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="EndingDate" value={valuesSoftwareProject.EndingDate} type="date" onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, EndingDate: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="JavaSDKDirectory" value={valuesSoftwareProject.JavaSDKDirectory} onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, JavaSDKDirectory: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="State" type="number" value={valuesSoftwareProject.State} onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, State: e.target.value.match(/^[0-9]+$/) ? e.target.value : "" }) }} />
                        </Grid>


                        <Grid sm={6}>
                            <Input label="JarFilesDirectory" value={valuesSoftwareProject.JarFilesDirectory} onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, JarFilesDirectory: e.target.value }) }} />
                        </Grid>


                        <Grid sm={6}>
                            <Input label="UseEnclosingPackage" value={valuesSoftwareProject.UseEnclosingPackage ? "true" : "false"} contentRightStyling={false} onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, UseEnclosingPackage: e.target.value }) }} contentRight={
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <BiCheckCircle color='#2B7A0B' style={{ cursor: "pointer" }} size={25} onClick={() => { setValuesSoftwareProject({ ...valuesSoftwareProject, UseEnclosingPackage: true }) }} />
                                    <BiXCircle color='#FF1E00' style={{ cursor: "pointer" }} size={25} onClick={() => { setValuesSoftwareProject({ ...valuesSoftwareProject, UseEnclosingPackage: false }) }} />
                                </div>
                            } />
                        </Grid>


                        <Grid sm={6}>
                            <Input label="EnclosingPackageName" value={valuesSoftwareProject.EnclosingPackageName} onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, EnclosingPackageName: e.target.value }) }} />
                        </Grid>


                        <Textarea label='Descripción' value={valuesSoftwareProject.Description} onChange={(e: any) => { setValuesSoftwareProject({ ...valuesSoftwareProject, Description: e.target.value }) }} css={{ width: "100%" }}></Textarea>

                        <Grid sm={12}>
                            <button className='btn-modal' style={{ fontSize: "18px", margin: "0px 0px 20px 0px" }}>Guardar</button>
                        </Grid>

                    </Grid.Container>
                </form>
            </Modal>

            {/* MODAL DE CREAR Y EDITAR DE LA TABLA -2 */}

            <Modal
                closeButton
                open={modalVisibleSofwareModule}
                onClose={closeHandlerSoftwareModule}
                css={{ padding: "20px", textAlign: "left" }}
            >
                <form onSubmit={handleSubmitSoftwareModule}>
                    <h2>{optionSubmitSoftwareModule ? "Crear" : "Editar"}</h2>
                    <Grid.Container gap={1}>
                        <Grid sm={6}>
                            <Input label="Name" value={valuesSoftwareModule.Name} onChange={(e: any) => { setValuesSoftwareModule({ ...valuesSoftwareModule, Name: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="DataBase" value={valuesSoftwareModule.DataBase} onClick={actionMostrarListaDataBase} />
                            <div className='lista-data-base' style={{ display: mostrarListaDataBase }}>
                                {listDataBaseCatalog.map((item: any) => {
                                    return <span onClick={() => { actionMostrarListaDataBase(); setValuesSoftwareModule({ ...valuesSoftwareModule, IDDataBase: item.IDDataBase, DataBase: item.Name }) }}>{item.Name}</span>
                                })}
                            </div>
                        </Grid>

                        <Grid sm={6}>
                            <Input label="InitDate" type="date" value={valuesSoftwareModule.InitDate} onChange={(e: any) => { setValuesSoftwareModule({ ...valuesSoftwareModule, InitDate: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="PackageName" value={valuesSoftwareModule.PackageName} onChange={(e: any) => { setValuesSoftwareModule({ ...valuesSoftwareModule, PackageName: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="EndingDate" type="date" value={valuesSoftwareModule.EndingDate} onChange={(e: any) => { setValuesSoftwareModule({ ...valuesSoftwareModule, EndingDate: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="State" type="number" value={valuesSoftwareModule.State} onChange={(e: any) => { setValuesSoftwareModule({ ...valuesSoftwareModule, State: e.target.value.match(/^[0-9]+$/) ? e.target.value : "" }) }} />
                        </Grid>

                        <Input css={{ width: "100%" }} label="TableMnemonic" value={valuesSoftwareModule.TableMnemonic} onChange={(e: any) => { setValuesSoftwareModule({ ...valuesSoftwareModule, TableMnemonic: e.target.value }) }} />

                        <Textarea label='Descripción' value={valuesSoftwareModule.Description} onChange={(e: any) => { setValuesSoftwareModule({ ...valuesSoftwareModule, Description: e.target.value }) }} css={{ width: "100%" }}></Textarea>


                        <Grid sm={12}>
                            <button className='btn-modal' style={{ fontSize: "18px", margin: "0px 0px 20px 0px" }}>Guardar</button>
                        </Grid>
                    </Grid.Container>
                </form>

            </Modal>



            <Modal
                closeButton
                open={modalVisibleProjectMember}
                onClose={closeHandlerProjectMember}
                css={{ padding: "20px", textAlign: "left" }}
            >
                <form onSubmit={handleSubmitProjectMember}>
                    <h2>{optionSubmitProjectMember ? "Crear" : "Editar"}</h2>
                    <Grid.Container gap={1}>
                        <Grid sm={6}>
                            <Input label='Cedula' value={valuesProjectMember.cedula} onChange={(e: any) => { setvaluesProjectMember({ ...valuesProjectMember, cedula: e.target.value.match(/^[0-9]+$/) ? e.target.value : "" }) }}></Input>
                        </Grid>

                        <Grid sm={6}>
                            <button className='btn-modal' type='button' onClick={getAccountByNit}>Buscar</button>
                        </Grid>

                        <Grid sm={12}>
                            <Input label='Resultado' value={valuesProjectMember.resultado} css={{ width: "100%" }}></Input>
                        </Grid>

                        <Grid sm={12}>
                            <Input label='InitDate' value={valuesProjectMember.initDate} type="date" onChange={(e: any) => { setvaluesProjectMember({ ...valuesProjectMember, initDate: e.target.value }) }} css={{ width: "100%" }}></Input>
                        </Grid>

                        <Grid sm={12}>
                            <Input label='EndingDate' value={valuesProjectMember.endingDate} type="date" onChange={(e: any) => { setvaluesProjectMember({ ...valuesProjectMember, endingDate: e.target.value }) }} css={{ width: "100%" }}></Input>
                        </Grid>

                        <Grid sm={12}>
                            <Input label='State' type="number" value={valuesProjectMember.state} onChange={(e: any) => { setvaluesProjectMember({ ...valuesProjectMember, state: e.target.value.match(/^[0-9]+$/) ? e.target.value : "" }) }} css={{ width: "100%" }}></Input>
                        </Grid>

                        <Grid sm={12}>
                            <button className='btn-modal' style={{ fontSize: "18px", margin: "0px 0px 20px 0px" }}>Guardar</button>
                        </Grid>
                    </Grid.Container>
                </form>

            </Modal>


            {/* MODAL DE ELIMINAR DE LA TABLA -1 */}
            <Modal closeButton open={vistaModalSofwareProject} onClose={closeModalDeleteSofwareProject} css={{ padding: "50px", color: "#73777B" }}>
                <h4>¿Esta seguro de eliminar esta fila?</h4>
                <Button onClick={eliminarSoftwareProject}>Eliminar</Button>
            </Modal>

            {/* MODAL DE ELIMINAR DE LA TABLA -2 */}
            <Modal closeButton open={vistaModalSofwareModule} onClose={closeModalDeleteSofwareModule} css={{ padding: "50px", color: "#73777B" }}>
                <h4>¿Esta seguro de eliminar esta fila?</h4>
                <Button onClick={eliminarSoftwareModule}>Eliminar</Button>
            </Modal>

            {/* MODAL DE ELIMINAR DE LA TABLA -3 */}
            <Modal closeButton open={vistaModalProjectMember} onClose={closeModalDeleteProjectMember} css={{ padding: "50px", color: "#73777B" }}>
                <h4>¿Esta seguro de eliminar esta fila?</h4>
                <Button onClick={eliminarProjectMember}>Eliminar</Button>
            </Modal>
        </>
    );

}


export default SoftwareProject;