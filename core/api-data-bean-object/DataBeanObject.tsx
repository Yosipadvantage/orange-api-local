import { Grid, Input, Modal, Textarea } from "@nextui-org/react";
import { Button, Table } from '@nextui-org/react';
import { BiEdit, BiTrash, BiPlusCircle, BiCheckCircle, BiXCircle, BiCaretDown, BiSitemap } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import { GlobalService } from "../../api/services/GlobalService";
import { context } from "../context/providerSpinner";
import toast from "react-hot-toast";
const services = new GlobalService();


interface IValues {
    DataBeanTable: string;
    name: string;
    description: string;
    Url: string;
    State: string;
}


const DataBeanObject = () => {

    //ESTADOS QUE CONTROLAN EL ALTO DE LAS LISTAS
    const [showSelector1, setShowSelector1] = useState("0px");
    const [showSelector2, setShowSelector2] = useState("0px");
    const [showSelector3, setShowSelector3] = useState("0px");


    //SON LAS LISTAS DE LOS SELECTORES
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);
    const [list3, setList3] = useState([]);


    //ESTADOS QUE ALMACENAN EL VALOR SELECIONADO DE CADA SELECTOR
    const [seleccion1, setSeleccion1] = useState("");
    const [ref1, setRef1] = useState<any>();
    const [seleccion2, setSeleccion2] = useState("");
    const [seleccion3, setSeleccion3] = useState("");
    const [seleccionForenKey, setSeleccionForenKey] = useState<any>("");


    //ESTADO QUE CONTIENE LA LISTA DE LA TABLA PRINCIPAL
    const [listTable, setListTable] = useState([]);

    //ESTADO QUE CONTIENE LA REFERENCIA DE LA 3 LISTA SELECIONADA
    const [refList3, setRefList3] = useState<any>(null);


    //CONTROLAN LA VISIBILIDAD DE MODAL PRINCIPAL
    const [visiblePrimary, setVisiblePrimary] = useState(false);

    //CONTROLA LA VISIBILIDAD DEL MODAL DE ELIMINAR PRINCIPAL
    const [visibleDelete, setVisibleDelete] = useState(false);

    //CONTROLA LA VISIBILIDAD DEL MODAL QUE CONTIENE LAS TABLAS DE OPCIONES
    const [visibleTable, setVisibleTable] = useState(false);

    //CONTROLA LA VISIBILIDAD DEL SPINNER
    const { setState }: any = useContext(context);

    //GUARDAR EL ID DE LA PRIMERA TABLA
    const [ID, setID] = useState<number>(0);

    //GUARDA EL ID DE LA PRIMERA TABLA Y LA SEGUNDA YA SEA PARA EDITAR O ELIMINAR
    const [ID2, setID2] = useState<number>(0);


    const [idDataBeanInfo, setIdDataBeanInfo] = useState<number>(0);
    const [idDataBeanProperty, setIdDataBeanProperty] = useState<number>(0);

    //EL ESTADO CONTROLA LA ACCION DEL FORMULARIO PRINCIPAL SI ES TRUE:CREA Y ES FALSE:EDITA
    const [optionSubmit, setOptionSubmit] = useState<boolean>(true);

    //CONTROLA LA VISTA DE LOS BOTONES DE LA PARTE SUPRERIOR DERECHA
    const [viewButtons, setViewButtons] = useState<boolean>(false);

    //CONTIENE LA LISTA DE LAS TABLA 1-2
    const [listData, setListData] = useState([]);

    //CONTROLA LA VISTA DE LAS TABLAS EN EL MODAL DE OPCIONES
    const [typeTable, setTypeTable] = useState("tabla-1");


    const [visibleForenKey, setVisibleForenKey] = useState(false);

    //CONTROLA LA VISTA DEL SELECTOR DBType QUE SE ENCUENTRA EN EL MODAL DEL DataBeanProperty List
    const [listDBType, setListDBType] = useState("none");


    //CONTROLA LA VISTA DEL SELECTOR Java DBDataType QUE SE ENCUENTRA EN EL MODAL DEL DataBeanProperty List
    const [listViewDataType, setListViewDataType] = useState("none");

    //CONTIENE LA LISTA DE ELEMENTOS DEL CAMPO DBDataType
    const [listJava, setListJava] = useState<any>([]);

    //CONTROLA LA VISTA DEL SELECTOR DBLength QUE SE ENCUENTRA EN EL MODAL DEL DataBeanProperty List
    const [listViewDBLength, setListViewDBLength] = useState("none");

    //CONTROLA LA VISTA DEL SELECTOR DBScale QUE SE ENCUENTRA EN EL MODAL DEL DataBeanProperty List
    const [listViewScale, setListViewScale] = useState("none");


    //CONTROLA LA VISTA DEL SELECTOR DBScale QUE SE ENCUENTRA EN EL MODAL DEL DataBeanProperty List
    const [viewForenKey, setViewForenKey] = useState("none");

    //SI ES TRUE: ELIMINAR EL ELEMENTO DE LA TABLA PRINCIPAL Y SI NES FALSE ELIMINA EL ELEMENTO DE LA TABLA DE DataBeanPropertyList
    const [optionDelete, setOptionDelete] = useState(false);

    //CONTROLA LA ACCION DE LAS TABLAS 1-2, SI ES TRUE:CREA Y SI ES FALSE: EDITA. ESTO LO MANIPULA LOS BOTONES DE CREAR Y EDITAR DE LAS TABLAS 1-2
    const [optionSubmit2, setOptionSubmit2] = useState<boolean>(true);


    //CONTIENE LOS VALORES DE LAS TABLAS
    const [valuesTabla1, setValuesTabla1] = useState({ Name: "", PropertyIsNotNull: "", TableKey: "", PropertyDefaultValue: "", DBType: "", DBForeignTableName: "", JavaClassType: "", DBForeignColumnName: "", DBDataType: "", DBLength: "", DBScale: "", Description: "" });
    const [valuesTabla2, setValuesTabla2] = useState({ MethodName: "", SQLQuery: "", Description: "" });
    const [valuesTabla3, setValuesTabla3] = useState<IValues>({ DataBeanTable: "", Url: "", name: "", description: "", State: "" });


    //CONTROLA LA VISIBILIDAD DEL MODAL DE LA PRIMERA TABLA
    const [viewTabla1, setViewTabla1] = useState(false);

    //CONTROLA LA VISIBILIDAD DEL MODAL DE LA SEGUNDA TABLA
    const [viewTabla2, setViewTabla2] = useState(false);

    //CONTROLA LA VISTA DEL SELECTOR Java Class Type QUE SE ENCUENTRA EN EL MODAL DEL DataBeanProperty List
    const [listViewClassType, setListViewClassType] = useState("none");

    //CONTIENE LOS ELEMENTOS DE LA LISTA DEL CAMPPO Java Class Type EN EL MODAL PRIMARIO
    const [listaClassType, setListClassType] = useState<any>([]);

    //CONTROLA LA VISIBILIDAD DEL MODAL ELIMINAR DE LA TABLA 2
    const [visibleDelet2, setvisibleDelet2] = useState(false);


    //VALORES DE LOS CAMPOS DEL MODAL DEL FORENKEY
    const [valuesForenKey, setValuesForenKey] = useState({ dataBean: "", dataBeanSelect: "", DataBeanProperty: "", property: "" });

    //LISTA DEL SELECTOR DEL FORENKEY
    const [listForenKey, setListForenKey] = useState<any>([]);



    //LISTA DEL PRIMER SELECTOR
    const getSoftwareProjectCatalog = () => {
        setState(true);
        services.getSoftwareProjectCatalog().subscribe((res: any) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue.length) {
                setList1(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties
                }))
            } else {
                toast.error("Hubo un error")
            }
        })
    }

    //CARGA LA LISTA DEL CAMPO Java Class Type
    useEffect(() => {
        services.getJavaDataType().subscribe((res: any) => {
            setListClassType(res.DataBeanProperties.ObjectValue.map((item: any) => {
                return item.DataBeanProperties
            }));
        })
    }, []);



    //CARGA LOS DATOS DE LA PRIMER SELECTOR
    useEffect(() => {
        getSoftwareProjectCatalog();
    }, [])



    //ESTE SERVICIO CARGA LA LISTA DE LA TABLA PRINCIPAL
    const getDataBeanInfoByDaoInfo = (IDDaoInfo: number) => {
        services.getDataBeanInfoByDaoInfo(IDDaoInfo).subscribe((res) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue.length) {
                setListTable(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties
                }));
            } else {
                toast.error("Error al cargar los datos")
            }
        })
    }


    //ESTE SERVICIO LLAMA LA LISTA DE LA TABLA-1
    const getDataBeanPropertyCatalog = () => {
        setListData([]);
        services.getDataBeanPropertyCatalog(ID).subscribe((res) => {
            setVisibleTable(true);
            setState(false);
            if (res.DataBeanProperties.ObjectValue.length) {
                setListData(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties;
                }));
            }

        })
    }


    //ESTE SERVICIO LLAMA LISTA DE LA TABLA -2
    const getDataBeanQueryCatalog = (ID: number) => {
        setState(true);
        setListData([]);
        services.getDataBeanQueryCatalog(ID).subscribe((res) => {
            setVisibleTable(true);
            setState(false);
            if (res.DataBeanProperties.ObjectValue.length) {
                setListData(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties;
                }));
            }
        })
    }



    //ESTA FUNCION RESETEA LOS VALORES DE LA TABLA -3 Y OCULTA EL MODAL PRIMARIO
    const closeHandler = () => {
        setVisiblePrimary(false);
        setValuesTabla3({ DataBeanTable: "", Url: "", name: "", description: "", State: "" });
    };


    //CONTROLA LA VISTA DEL MODAL DE ELIMINAR DE LA TABLA-2
    const closeModal = () => {
        setvisibleDelet2(false);
    };

    //CONTROLA LA VISIBILIDAD DEL MODAL DE ELIMINAR DE LA TABLA PRIMARIA
    const closeHandler2 = () => {
        setVisibleDelete(false);
    };


    const closeHandler3 = () => {
        setVisibleTable(false);
    };

    const closeModalTabla1 = () => {
        setViewTabla1(false);
        setValuesTabla1({ Name: "", PropertyIsNotNull: "", TableKey: "", PropertyDefaultValue: "", DBType: "", DBForeignTableName: "", JavaClassType: "", DBForeignColumnName: "", DBDataType: "", DBLength: "", DBScale: "", Description: "" });
    };

    const closeModalTabla2 = () => {
        setViewTabla2(false);
        setValuesTabla2({ MethodName: "", SQLQuery: "", Description: "" });
    };




    const closeModalForenKey = () => {
        setVisibleForenKey(false);
        setValuesForenKey({ dataBean: "", dataBeanSelect: "", DataBeanProperty: "", property: "" });
        setListForenKey([]);
    }


    const getDaoInfoCatalogBySoftwareModule = (IDSoftwareModule: number) => {
        setState(true);
        services.getDaoInfoCatalogBySoftwareModule(IDSoftwareModule).subscribe((res) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue.length) {
                setList3(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties;
                }));
            } else {
                toast("No tiene elementos que mostrar")
            }
        })
    }


    //CUANDO SE SELECCIONA EL PRIMER SELECTOR EJECUTAR UN SERVICIO QUE LLENARA EL SEGUNDO SELECTOR
    const seleccionLista1 = (item: any) => {
        setRef1(item);
        setSeleccion1(item.Name);
        setSeleccion2("");
        setShowSelector1("0px");
        setSeleccion3("");
        setShowSelector3("0px");
        setShowSelector2("0px");
        services.getSoftwareModuleCatalog(item.IDSoftwareProject).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue.length) {
                setList2(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties;
                }))
            }
        })
    }




    const seleccionLista2 = (item: any) => {
        setSeleccion2(item.Name);
        setShowSelector2("0px");
        setList3([]);
        setSeleccion3("");
        setShowSelector3("0px");
        getDaoInfoCatalogBySoftwareModule(item.IDSoftwareModule);

    }



    const seleccionLista3 = (item: any) => {
        setRefList3(item);
        setSeleccion3(item.Name);
        setState(true);
        setShowSelector3("0px");
        getDataBeanInfoByDaoInfo(item.IDDaoInfo);

    }

    //FUNCION QUE CONTROLA SI SE CREA O EDITA
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!valuesTabla3.name || !valuesTabla3.description) {
            toast.error("Llena todos los campos");
        } else {
            if (optionSubmit) {
                crearElemento();
            } else {
                editarElemento();
            }
        }
    }


    //VISUALIZARN  Y OCULTAN LOS SELECTORES CADA VEX QUE SE DA CLICK
    const focusSelector1 = () => {
        if (showSelector1 === "0px") {
            setShowSelector1("auto");
        } else {
            setShowSelector1("0px");
        }
    }

    const focusSelector2 = () => {
        if (showSelector2 === "0px") {
            setShowSelector2("auto");
        } else {
            setShowSelector2("0px");
        }
    }

    const focusSelector3 = () => {
        if (showSelector3 === "0px") {
            setShowSelector3("auto");
        } else {
            setShowSelector3("0px");
        }
    }




    const crearElemento = () => {

        const { IDSoftwareModule, IDDaoInfo } = refList3;
        const bean = {
            "IDDataBeanInfo": null,
            "IDSoftwareModule": IDSoftwareModule,
            "Description": valuesTabla3.description,
            "IDDaoInfo": IDDaoInfo,
            "State": valuesTabla3.State,
            "DataBeanTable": valuesTabla3.DataBeanTable,
            "URL": valuesTabla3.Url,
            "Name": valuesTabla3.name
        }

        services.updateDataBeanInfo(bean).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue.DataBeanProperties) {
                toast.success("Creado con exito");
                closeHandler();
                getDataBeanInfoByDaoInfo(IDDaoInfo);
            } else {
                toast.error("Hubo un error al intentar crear el elemento");
            }
        })
    }


    const editarElemento = () => {
        const { IDSoftwareModule, IDDaoInfo } = refList3;
        const bean = {
            "IDDataBeanInfo": ID,
            "IDSoftwareModule": IDSoftwareModule,
            "Description": valuesTabla3.description,
            "IDDaoInfo": IDDaoInfo,
            "State": valuesTabla3.State,
            "DataBeanTable": valuesTabla3.DataBeanTable,
            "URL": valuesTabla3.Url,
            "Name": valuesTabla3.name
        }

        services.updateDataBeanInfo(bean).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue.DataBeanProperties) {
                toast.success("Actualizado con exito");
                closeHandler();
                getDataBeanInfoByDaoInfo(IDDaoInfo);
            } else {
                toast.error("Hubo un error al intentar actualizar el elemento");
            }
        })
    }



    const eliminarElemento = () => {
        setState(true);
        if (optionDelete) {
            services.deleteDataBeanProperty(ID2).subscribe((res: any) => {
                setState(false);
                if (res.DataBeanProperties.Type === 0) {
                    toast.success("Eliminado con exito");
                    closeHandler2();
                    getDataBeanPropertyCatalog();

                } else {
                    toast.error("Error al intentar eliminar");
                }
            })
        } else {
            services.deleteDataBeanInfo(ID).subscribe((res) => {
                setState(false);
                if (res.DataBeanProperties.Type === 0) {
                    toast.success("Eliminado con exito");
                    closeHandler2();
                    const { IDDaoInfo } = refList3;
                    getDataBeanInfoByDaoInfo(IDDaoInfo);

                } else {
                    toast.error("Error al intentar eliminar");
                }

            });
        }
    }

    const eliminarElement2 = () => {
        services.deleteDataBeanQuery(ID2).subscribe((res) => {
            if (res.DataBeanProperties.Type === 0) {
                toast.success("Se elimino correctamente");
                closeModal();
                getDataBeanQueryCatalog(ID);
            } else {
                toast.error("Hubo un error inesperado");
            }
        })
    }

    const checkButton = (e: any) => {
        setViewButtons(true);
        setID(e.IDDataBeanInfo);
        setID2(e.IDDataBeanProperty);
        setShowSelector1("0px");
        setShowSelector2("0px");
        setShowSelector3("0px");
    }


    const handleDataBeanProperty = () => {
        setState(true);
        setTypeTable("tabla-1");
        getDataBeanPropertyCatalog();
    }



    const handleSqlQuery = () => {
        setState(true);
        setTypeTable("tabla-2");
        getDataBeanQueryCatalog(ID);
    }


    const mostrarLista1 = () => {
        if (listDBType === "none") {
            setListDBType("flex");
        } else {
            setListDBType("none");
        }
    }


    const mostrarListViewClassType = () => {
        setListViewDataType("none");
        if (listViewClassType === "none") {
            setListViewClassType("flex");
        } else {
            setListViewClassType("none");
        }
    }


    const mostrarViewDataType = () => {
        if (listViewDataType === "none") {
            setListViewDataType("flex");
        } else {
            setListViewDataType("none");
        }
    }


    const mostrarViewDbLength = () => {
        setListViewScale("none");
        if (listViewDBLength === "none") {
            setListViewDBLength("flex");
        } else {
            setListViewDBLength("none");
        }
    }


    const mostrarListaForenKey = () => {
        setViewForenKey("none");
        if (viewForenKey === "none") {
            setViewForenKey("flex");
        } else {
            setViewForenKey("none");
        }
    }


    const mostrarViewDbScale = () => {
        setListViewDBLength("none");
        if (listViewScale === "none") {
            setListViewScale("flex");
        } else {
            setListViewScale("none");
        }
    }

    const callServices = (item: any) => {
        mostrarListViewClassType();
        const { ClassForName } = item;
        console.log("ClassForName", ClassForName)
        services.getDataTypeListByDBType(ClassForName).subscribe((res: any) => {
            setListJava(res.DataBeanProperties.ObjectValue.map((item: any) => {
                return item.DataBeanProperties
            }));
        })
    }


    const crearElemento2 = () => {

        const bean = {
            "IDDataBeanProperty": null,
            "Description": valuesTabla1.Description,
            "DBForeignColumnName": valuesTabla1.DBForeignColumnName,
            "DBDataType": valuesTabla1.DBDataType,
            "DBType": valuesTabla1.DBType === "ORACLE" ? 0 : 1,
            "Name": valuesTabla1.Name,
            "DBLength": Number(valuesTabla1.DBLength),
            "PropertyIsNotNull": valuesTabla1.PropertyIsNotNull === "true" ? true : false,
            "TableKey": valuesTabla1.TableKey === "true" ? true : false,
            "DBScale": Number(valuesTabla1.DBScale),
            "IDDataBeanInfo": ID,
            "ClassForName": valuesTabla1.JavaClassType,
            "PropertyDefaultValue": valuesTabla1.PropertyDefaultValue,
            "DBForeignTableName": valuesTabla1.DBForeignTableName
        }



        services.updateDataBeanProperty(bean).subscribe((res) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue.DataBeanProperties) {
                toast.success("Se creo correctamente");
                getDataBeanPropertyCatalog();
                closeModalTabla1();
            } else {
                toast.error("Hubo un error inesperado");
            }
        })
    }

    const editarElemento2 = () => {


        const bean = {
            "IDDataBeanProperty": ID2,
            "Description": valuesTabla1.Description,
            "DBForeignColumnName": valuesTabla1.DBForeignColumnName,
            "DBDataType": valuesTabla1.DBDataType,
            "DBType": valuesTabla1.DBType === "ORACLE" ? 0 : 1,
            "Name": valuesTabla1.Name,
            "DBLength": Number(valuesTabla1.DBLength),
            "PropertyIsNotNull": valuesTabla1.PropertyIsNotNull === "true" ? true : false,
            "TableKey": valuesTabla1.TableKey === "true" ? true : false,
            "DBScale": Number(valuesTabla1.DBScale),
            "IDDataBeanInfo": ID,
            "ClassForName": valuesTabla1.JavaClassType,
            "PropertyDefaultValue": valuesTabla1.PropertyDefaultValue,
            "DBForeignTableName": valuesTabla1.DBForeignTableName
        }



        services.updateDataBeanProperty(bean).subscribe((res) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue.DataBeanProperties) {
                toast.success("Se creo correctamente");
                getDataBeanPropertyCatalog();
                closeModalTabla1();
            } else {
                toast.error("Hubo un error inesperado");
            }
        })

    }

    const handleTabla1 = (e: any) => {
        e.preventDefault();
        setState(true);
        if (optionSubmit2) {
            crearElemento2();
        } else {
            editarElemento2();
        }
    }


    const handleTabla2 = (e: any) => {
        e.preventDefault();
        setState(true);
        if (optionSubmit2) {
            crearElemento3();
        } else {
            editarElemento3();
        }
    }


    const crearElemento3 = () => {
        const bean = {
            "IDDataBeanInfo": ID,
            "Description": valuesTabla2.Description,
            "IDDataBeanQuery": null,
            "MethodName": valuesTabla2.MethodName,
            "SQLQuery": valuesTabla2.SQLQuery,
            "IDAccount": null
        }
        services.updateDataBeanQuery(bean).subscribe((res) => {
            setState(false);
            getDataBeanQueryCatalog(ID);
            closeModalTabla2()
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("Se creo correctamente");
            } else {
                toast.error("hubo un error inesperado");
            }
        })
    }


    const editarElemento3 = () => {
        const bean = {
            "IDDataBeanInfo": ID,
            "Description": valuesTabla2.Description,
            "IDDataBeanQuery": ID2,
            "MethodName": valuesTabla2.MethodName,
            "SQLQuery": valuesTabla2.SQLQuery,
            "IDAccount": null
        }
        services.updateDataBeanQuery(bean).subscribe((res) => {
            setState(false);
            getDataBeanQueryCatalog(ID);
            closeModalTabla2()
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("Se actualizo correctamente");
            } else {
                toast.error("hubo un error inesperado");
            }
        })
    }


    const resetValues = (item: any) => {
        setValuesTabla1({ Name: item.Name, PropertyIsNotNull: item.PropertyIsNotNull, TableKey: item.TableKey, PropertyDefaultValue: item.PropertyDefaultValue, DBType: item.DBType, DBForeignTableName: item.DBForeignTableName, JavaClassType: item.ClassForName, DBForeignColumnName: item.DBForeignColumnName, DBDataType: item.DBDataType, DBLength: item.DBLength, DBScale: item.DBScale, Description: item.Description });
    }

    const buscarForenKey = () => {
        setState(true);
        services.getDataBeanInfoByPattern(ref1.idSoftwareProject, valuesForenKey.dataBean).subscribe((res: any) => {
            setState(false);
            console.log("response", res);
            if (res.DataBeanProperties.ObjectValue.length) {
                toast.success("Se encontraron coincidencias");
                setListForenKey(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties
                }));
            } else {
                toast.error("No se encontraro coincidencias");
            }
        })
    }

    const asociarForenKey = () => {
        setState(true);
        services.addDataBeanPropertyForeignKey(idDataBeanInfo, idDataBeanProperty, valuesForenKey.property).subscribe((res: any) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("Llave ForenKey creada");
                getDataBeanPropertyCatalog();
                closeModalForenKey();
                setListForenKey([]);
                setValuesForenKey({ dataBean: "", dataBeanSelect: "", DataBeanProperty: "", property: "" });
            } else {
                toast.error("Error al crear la llave ForenKey")
            }

        })
    }

    const getDataBeanPropertyPrimaryKey = (idDataBeanInfo: number) => {
        services.getDataBeanPropertyPrimaryKey(idDataBeanInfo).subscribe((res: any) => {
            if (res.DataBeanProperties.ObjectValue.length) {
                setIdDataBeanProperty(res.DataBeanProperties.ObjectValue[0].DataBeanProperties.IDDataBeanProperty)
            }
        })
    }


    console.log("data", listData)
    return (
        <>
            <Grid.Container>
                <Grid sm={4} css={{ padding: "5px", display: "flex", flexDirection: "column" }}>
                    <Input label="Software Project" placeholder="Found" value={seleccion1} css={{ width: "100%" }} size="lg" onClick={focusSelector1} />
                    <div className="selector-1" style={{ height: showSelector1 }}>
                        <ul className="lista">
                            {list1.map((item: any, index: number) => {
                                return (<li key={index} onClick={() => { seleccionLista1(item) }}>{item.Name}</li>)
                            })}
                        </ul>
                    </div>
                </Grid>
                <Grid sm={4} css={{ padding: "5px", display: "flex", flexDirection: "column" }}>
                    <Input label="Software Module" placeholder="Found" value={seleccion2} css={{ width: "100%" }} size="lg" onClick={focusSelector2} />
                    <div className="selector-1" style={{ height: showSelector2 }}>
                        <ul className="lista">
                            {list2.map((item: any, index: number) => {
                                return (<li key={index} onClick={() => { seleccionLista2(item) }}>{item.Name}</li>)
                            })}
                        </ul>
                    </div>
                </Grid>


                <Grid sm={4} css={{ padding: "5px", display: "flex", flexDirection: "column" }}>
                    <Input label="Data Access Object" placeholder="Found" value={seleccion3} css={{ width: "100%" }} size="lg" onClick={focusSelector3} />
                    <div className="selector-1" style={{ height: showSelector3 }}>
                        <ul className="lista">
                            {list3.map((item: any, index: number) => {
                                return (<li key={index} onClick={() => { seleccionLista3(item) }}>{item.Name}</li>)
                            })}
                        </ul>
                    </div>
                </Grid>
            </Grid.Container>

            {seleccion3 &&
                <>
                    <section className="vista-botones">
                        <Button onClick={() => { setVisiblePrimary(true); setOptionSubmit(true) }} css={{ fontSize: "18px", paddingRight: "10px", margin: "10px 0px" }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>
                        {viewButtons &&
                            <div>
                                <button className="btn-actions" onClick={handleDataBeanProperty} style={{ fontSize: "14px", margin: "0px 5px" }}>DataBeanProperty List</button>
                                <button className="btn-actions" onClick={handleSqlQuery} style={{ fontSize: "14px", margin: "0px 5px" }}>SqlQuery List</button>
                            </div>

                        }

                    </section>
                    <Table css={{ height: "auto", minWidth: "100%" }}>
                        <Table.Header>
                            <Table.Column css={{ fontSize: "16px" }}>Opc</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>IDDataBeanInfo</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Name</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>ClassForName</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Description</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>State</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Tabla</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Since</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {listTable.map((item: any, index: number) => {

                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell><input type="radio" value={item.IDDataBeanInfo} name="radio" onChange={() => { checkButton(item); setIdDataBeanInfo(item.IDDataBeanInfo) }}></input></Table.Cell>
                                        <Table.Cell>{item.IDDataBeanInfo}</Table.Cell>
                                        <Table.Cell>{item.Name}</Table.Cell>
                                        <Table.Cell>{item.ClassForName}</Table.Cell>
                                        <Table.Cell>{item.Description}</Table.Cell>
                                        <Table.Cell>{item.State}</Table.Cell>
                                        <Table.Cell>{item.DataBeanTable}</Table.Cell>
                                        <Table.Cell>{item.Since}</Table.Cell>
                                        <Table.Cell>
                                            <div>
                                                <button className='btn-table' onClick={() => { setVisiblePrimary(true); setOptionSubmit(false); setID(item.IDDataBeanInfo); setValuesTabla3({ DataBeanTable: item.DataBeanTable, Url: item.URL, name: item.Name, description: item.Description, State: item.State }); }}><BiEdit color='white' style={{ display: "block" }} /></button>
                                                <button className='btn-table' onClick={() => { setVisibleDelete(true); setID(item.IDDataBeanInfo); setOptionDelete(false) }}><BiTrash color='white' style={{ display: "block" }} /></button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </>
            }

            <Modal
                closeButton
                open={visiblePrimary}
                onClose={closeHandler}
                css={{ padding: "20px", textAlign: "left" }}
            >

                <form onSubmit={handleSubmit}>
                    <h2>{optionSubmit ? "Crear " : "Editar"}</h2>
                    <Grid.Container gap={1}>

                        <Grid sm={12}>
                            <Input label="Nombre" css={{ width: "100%" }} size="lg" value={valuesTabla3.name} onChange={(e) => { setValuesTabla3({ ...valuesTabla3, name: e.target.value }) }} />
                        </Grid>

                        <Grid sm={12}>
                            <Input label="State" css={{ width: "100%" }} size="lg" value={valuesTabla3.State} onChange={(e) => { setValuesTabla3({ ...valuesTabla3, State: e.target.value }) }} />
                        </Grid>

                        <Grid sm={12}>
                            <Input label="DataBeanTable" css={{ width: "100%" }} size="lg" value={valuesTabla3.DataBeanTable} onChange={(e) => { setValuesTabla3({ ...valuesTabla3, DataBeanTable: e.target.value }) }} />
                        </Grid>

                        <Grid sm={12}>
                            <Input label="URL" css={{ width: "100%" }} size="lg" value={valuesTabla3.Url} onChange={(e) => { setValuesTabla3({ ...valuesTabla3, Url: e.target.value }) }} />
                        </Grid>

                        <Grid sm={12}>
                            <Textarea label="Descripción" css={{ width: "100%" }} size="lg" value={valuesTabla3.description} onChange={(e) => { setValuesTabla3({ ...valuesTabla3, description: e.target.value }) }} />
                        </Grid>

                        <Grid sm={12}>
                            <button className='btn-modal' style={{ margin: "15px 0px", fontSize: "18px" }} type='submit'>Guardar</button>
                        </Grid>
                    </Grid.Container>
                </form>
            </Modal>
            <Modal width={typeTable === "tabla-1" ? "1800px" : "800px"} closeButton open={visibleTable} onClose={closeHandler3}>

                {/* TABLA-1 */}
                {typeTable === "tabla-1" &&
                    <>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Button onClick={() => { setViewTabla1(true); setOptionSubmit2(true) }} css={{ fontSize: "18px", paddingRight: "10px", marginLeft: "15px", width: "200px" }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>
                            <Button onClick={() => { setVisibleForenKey(true) }} css={{ fontSize: "18px", paddingRight: "10px", marginLeft: "15px", width: "200px" }}>ForenKey <BiSitemap size={25} style={{ margin: "0px 5px" }} /></Button>
                        </div>
                        <h2>DataBeanProperty List</h2>
                        <Table>

                            <Table.Header>
                                <Table.Column css={{ fontSize: "16px" }}>IDDataBeanProperty</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>Name</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>Description</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>TableKey</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>DBType</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>ClassForName</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>DBDataType</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>DBLength</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>DBScale</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>PropertyIsNotNull</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>Llave Foránea</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {listData.map((item: any, index: number) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{item.IDDataBeanProperty}</Table.Cell>
                                            <Table.Cell>{item.Name}</Table.Cell>
                                            <Table.Cell>{item.Description}</Table.Cell>
                                            <Table.Cell>{item.TableKey ? <BiCheckCircle color='#2B7A0B' style={{ cursor: "pointer" }} size={25} /> : <BiXCircle color='#FF1E00' style={{ cursor: "pointer" }} size={25} />}</Table.Cell>
                                            <Table.Cell>{item.DBType}</Table.Cell>
                                            <Table.Cell>{item.ClassForName}</Table.Cell>
                                            <Table.Cell>{item.DBDataType}</Table.Cell>
                                            <Table.Cell>{item.DBLength}</Table.Cell>
                                            <Table.Cell>{item.DBScale}</Table.Cell>
                                            <Table.Cell>{item.PropertyIsNotNull ? <BiCheckCircle color='#2B7A0B' style={{ cursor: "pointer" }} size={25} /> : <BiXCircle color='#FF1E00' style={{ cursor: "pointer" }} size={25} />}</Table.Cell>
                                            <Table.Cell css={{ fontSize: "12px" }}>
                                                {item.DBForeignTableName}
                                                <br />
                                                ({item.DBForeignColumnName})
                                            </Table.Cell>
                                            <Table.Cell>
                                                <button className='btn-table' onClick={() => { setViewTabla1(true); setID2(item.IDDataBeanProperty); setOptionSubmit2(false); resetValues(item) }}><BiEdit color='white' style={{ display: "block" }} /></button>
                                                <button className='btn-table' onClick={() => { setVisibleDelete(true); setID2(item.IDDataBeanProperty); setOptionDelete(true) }}><BiTrash color='white' style={{ display: "block" }} /></button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                        <Modal width="550px" closeButton open={viewTabla1} onClose={closeModalTabla1} css={{ padding: "20px", textAlign: "left", overflow: "visible" }}>
                            <form onSubmit={handleTabla1}>

                                <h2>{optionSubmit2 ? "Crear" : "Editar"}</h2>
                                <Grid.Container gap={1}>
                                    <Grid sm={6}>
                                        <Input label="Name" css={{ width: "100%" }} value={valuesTabla1.Name} onChange={(e: any) => { setValuesTabla1({ ...valuesTabla1, Name: e.target.value }) }} size="lg" />
                                    </Grid>
                                    <Grid sm={6}>
                                        <Input
                                            value={valuesTabla1.PropertyIsNotNull}
                                            contentRightStyling={false}
                                            size="lg"
                                            label="PropertyIsNotNull"
                                            contentRight={
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <BiCheckCircle color='#2B7A0B' style={{ cursor: "pointer" }} size={25} onClick={() => { setValuesTabla1({ ...valuesTabla1, PropertyIsNotNull: "true" }) }} />
                                                    <BiXCircle color='#FF1E00' style={{ cursor: "pointer" }} size={25} onClick={() => { setValuesTabla1({ ...valuesTabla1, PropertyIsNotNull: "false" }) }} />
                                                </div>
                                            }
                                        />
                                    </Grid>

                                    <Grid sm={6}>
                                        <Input
                                            value={valuesTabla1.TableKey}
                                            contentRightStyling={false}
                                            size="lg"
                                            label="TableKey"
                                            contentRight={
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <BiCheckCircle color='#2B7A0B' style={{ cursor: "pointer" }} size={25} onClick={() => { setValuesTabla1({ ...valuesTabla1, TableKey: "true" }) }} />
                                                    <BiXCircle color='#FF1E00' style={{ cursor: "pointer" }} size={25} onClick={() => { setValuesTabla1({ ...valuesTabla1, TableKey: "false" }) }} />
                                                </div>
                                            }
                                        />
                                    </Grid>
                                    <Grid sm={6}>
                                        <Input label="PropertyDefaultValue" value={valuesTabla1.PropertyDefaultValue} onChange={(e: any) => { setValuesTabla1({ ...valuesTabla1, PropertyDefaultValue: e.target.value }) }} css={{ width: "100%" }} size="lg" />

                                    </Grid>

                                    <Grid sm={6}>
                                        <Input label="DBType" css={{ width: "100%" }} size="lg" onClick={mostrarLista1} value={valuesTabla1.DBType ? "MYSQL" : "ORACLE"} contentRight={<span className="icono"> <BiCaretDown /></span>} />
                                        <div className="lista-modal-1" style={{ display: listDBType }}>
                                            <span onClick={() => { mostrarLista1(); setValuesTabla1({ ...valuesTabla1, DBType: "MYSQL" }) }}>MYSQL</span>
                                            <span onClick={() => { mostrarLista1(); setValuesTabla1({ ...valuesTabla1, DBType: "ORACLE" }) }}>ORACLE</span>
                                        </div>
                                    </Grid>
                                    <Grid sm={6}>
                                        <Input label="DBForeignTableName" css={{ width: "100%" }} value={valuesTabla1.DBForeignTableName} onChange={(e: any) => { setValuesTabla1({ ...valuesTabla1, DBForeignTableName: e.target.value }) }} size="lg" />
                                    </Grid>

                                    <Grid sm={6}>
                                        <Input label="Java Class Type" value={valuesTabla1.JavaClassType} css={{ width: "100%" }} size="lg" onClick={mostrarListViewClassType} contentRight={<span className="icono"> <BiCaretDown /> </span>} />
                                        <div className="lista-modal-2" style={{ display: listViewClassType }}>
                                            {listaClassType.map((item: any) => {
                                                return <span onClick={() => { callServices(item); setValuesTabla1({ ...valuesTabla1, JavaClassType: item.ClassForName }) }}>{item.ClassForName}</span>
                                            })}
                                        </div>
                                    </Grid>
                                    <Grid sm={6}>
                                        <Input label="DBForeignColumnName" css={{ width: "100%" }} size="lg" value={valuesTabla1.DBForeignColumnName} onChange={(e: any) => { setValuesTabla1({ ...valuesTabla1, DBForeignColumnName: e.target.value }) }} />
                                    </Grid>

                                    <Grid sm={6}>
                                        <Input label="DBDataType" css={{ width: "100%" }} onClick={mostrarViewDataType} size="lg" value={valuesTabla1.DBDataType} contentRight={<span className="icono"> <BiCaretDown /></span>} />
                                        <div className="lista-modal-3" style={{ display: listViewDataType }}>
                                            {listJava.map((item: any) => {
                                                return <span onClick={() => { mostrarViewDataType(); setValuesTabla1({ ...valuesTabla1, DBDataType: item.DataType }) }}>{item.DataType}</span>
                                            })}
                                        </div>
                                    </Grid>

                                    <Grid sm={6}>
                                        <Input label="DBLength" css={{ width: "100%" }} size="lg" value={valuesTabla1.DBLength} onClick={mostrarViewDbLength} contentRight={<span className="icono"> <BiCaretDown /></span>} />
                                        <div className="lista-modal-4" style={{ display: listViewDBLength }}>
                                            {listJava.map((item: any) => {
                                                return <span onClick={() => { mostrarViewDbLength(); setValuesTabla1({ ...valuesTabla1, DBLength: item.MaxLength }) }}>{item.MaxLength}</span>
                                            })}
                                        </div>
                                    </Grid>
                                    <Grid sm={12}>
                                        <Input label="DBScale" css={{ width: "100%" }} size="lg" value={valuesTabla1.DBScale} onClick={mostrarViewDbScale} contentRight={<BiCaretDown />} />
                                        <div className="lista-modal-5" style={{ display: listViewScale }}>
                                            {listJava.map((item: any) => {
                                                return <span onClick={() => { mostrarViewDbScale(); setValuesTabla1({ ...valuesTabla1, DBScale: item.Scale }) }}>{item.Scale}</span>
                                            })}
                                        </div>
                                    </Grid>

                                    <Grid sm={12}>
                                        <Textarea label="Description" css={{ width: "100%" }} size="lg" value={valuesTabla1.Description} onChange={(e: any) => { setValuesTabla1({ ...valuesTabla1, Description: e.target.value }) }} />
                                    </Grid>
                                </Grid.Container>
                                <Grid sm={12}>
                                    <button className='btn-modal' style={{ margin: "0px 0px 22px 0px", fontSize: "18px" }} type='submit'>Guardar</button>
                                </Grid>
                            </form>
                        </Modal>
                    </>

                }


                {typeTable === "tabla-2" &&
                    <>
                        <Button onClick={() => { setViewTabla2(true); setOptionSubmit2(true) }} css={{ fontSize: "18px", paddingRight: "10px", marginLeft: "15px", width: "200px" }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>
                        <h2>SqlQuery List</h2>
                        <Table css={{ height: "auto", minWidth: "100%" }}>
                            <Table.Header>
                                <Table.Column css={{ fontSize: "16px" }}>IDDataBeanQuery</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>MethodName</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>SQLQuery</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>Description</Table.Column>
                                <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {listData.map((item: any, index: number) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{item.IDDataBeanQuery}</Table.Cell>
                                            <Table.Cell>{item.MethodName}</Table.Cell>
                                            <Table.Cell>{item.SQLQuery}</Table.Cell>
                                            <Table.Cell>{item.Description}</Table.Cell>
                                            <Table.Cell>
                                                <button className='btn-table' onClick={() => { setViewTabla2(true); setOptionSubmit2(false); setID2(item.IDDataBeanQuery); setValuesTabla2({ MethodName: item.MethodName, SQLQuery: item.SQLQuery, Description: item.Description }) }}><BiEdit color='white' style={{ display: "block" }} /></button>
                                                <button className='btn-table' onClick={() => { setvisibleDelet2(true); setID2(item.IDDataBeanQuery) }}><BiTrash color='white' style={{ display: "block" }} /></button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                        <Modal width="550px" closeButton open={viewTabla2} onClose={closeModalTabla2} css={{ padding: "20px", textAlign: "left", overflow: "visible" }}>
                            <form onSubmit={handleTabla2}>
                                <h2>{optionSubmit2 ? "Crear" : "Editar"}</h2>
                                <Grid sm={12}>
                                    <Input label="MethodName" css={{ width: "100%" }} size="lg" value={valuesTabla2.MethodName} onChange={(e: any) => { setValuesTabla2({ ...valuesTabla2, MethodName: e.target.value }) }} />
                                </Grid>
                                <Grid sm={12}>
                                    <Input label="SQLQuery" css={{ width: "100%" }} size="lg" value={valuesTabla2.SQLQuery} onChange={(e: any) => { setValuesTabla2({ ...valuesTabla2, SQLQuery: e.target.value }) }} />
                                </Grid>
                                <Grid sm={12}>
                                    <Textarea label="Description" css={{ width: "100%" }} size="lg" value={valuesTabla2.Description} onChange={(e: any) => { setValuesTabla2({ ...valuesTabla2, Description: e.target.value }) }} />
                                </Grid>
                                <Grid sm={12}>
                                    <button className='btn-modal' style={{ margin: "0px 0px 22px 0px", fontSize: "18px" }} type='submit'>Guardar</button>
                                </Grid>
                            </form>
                        </Modal>
                    </>

                }
            </Modal>
            <Modal closeButton open={visibleDelete} onClose={closeHandler2} css={{ padding: "50px", color: "#73777B" }}>
                <h4>¿Esta seguro de eliminar esta fila?</h4>
                <Button onClick={eliminarElemento}>Eliminar</Button>
            </Modal>

            <Modal closeButton open={visibleDelet2} onClose={closeModal} css={{ padding: "50px", color: "#73777B" }}>
                <h4>¿Esta seguro de eliminar esta fila?</h4>
                <Button onClick={eliminarElement2}>Eliminar</Button>
            </Modal>

            <Modal closeButton open={visibleForenKey} onClose={closeModalForenKey} css={{ padding: "50px", color: "#73777B", textAlign: "left" }}>
                <Input label="Nombre DataBean" css={{ width: "100%" }} size="lg" value={valuesForenKey.dataBean} onChange={(e: any) => { setValuesForenKey({ ...valuesForenKey, dataBean: e.target.value }) }} />
                <Button onClick={buscarForenKey} style={{ width: "100px", marginTop: "20px" }}>Buscar</Button>
                {listForenKey.length > 0 &&

                    <>
                        <Input label="DataBean" css={{ width: "100%" }} onClick={mostrarListaForenKey} size="lg" value={valuesForenKey.dataBeanSelect} />
                        <div className="lista-foren-key" style={{ display: viewForenKey }}>
                            {listForenKey.map((item: any) => {
                                return <span onClick={() => { mostrarListaForenKey(); getDataBeanPropertyPrimaryKey(item.IDDataBeanInfo); setIdDataBeanProperty(item.IDDataBeanInfo); setValuesForenKey({ ...valuesForenKey, dataBeanSelect: item.ClassForName, DataBeanProperty: item.Name, property: item.Name }) }}>{item.ClassForName}</span>
                            })}
                        </div>
                        <Input label="DataBeanProperty" css={{ width: "100%" }} size="lg" value={valuesForenKey.DataBeanProperty} />
                        <Input label="Nombre Propiedad" css={{ width: "100%" }} size="lg" value={valuesForenKey.property} onChange={(e: any) => { setValuesForenKey({ ...valuesForenKey, property: e.target.value }) }} />
                        <Button onClick={asociarForenKey} style={{ width: "100px", marginTop: "20px" }}>Asociar</Button>
                    </>
                }

            </Modal>
        </>
    );
}



export default DataBeanObject;