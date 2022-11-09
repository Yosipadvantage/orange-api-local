import { Grid, Input, Modal, Textarea } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { Button, Table } from '@nextui-org/react';
import { BiEdit, BiTrash, BiPlusCircle } from "react-icons/bi";
import { GlobalService } from "../../api/services/GlobalService";
import { context } from "../context/providerSpinner";
import toast from "react-hot-toast";
const services = new GlobalService();


interface IValues {
    name: string;
    description: string;
}

export const DataAccessObject = () => {




    //ESTADOS QUE CONTROLAN EL ALTO DE LOS SELECTORES
    const [showSelector1, setShowSelector1] = useState("0px");
    const [showSelector2, setShowSelector2] = useState("0px");
    const [seleccio1, setSeleccio1] = useState("");
    const [seleccio2, setSeleccio2] = useState("");
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [listTable, setListTable] = useState([]);
    const { setState }: any = useContext(context);
    const [ref1, setRef1] = useState<any>(null);
    const [ref2, setRef2] = useState<any>(null);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [optionSubmit, setOptionSubmit] = useState<boolean>(true);
    const [values, setValues] = useState<IValues>({ name: "", description: "" });
    const [rowDelete, setRowDelete] = useState<any>();
    const [ID, setID] = useState<any>(0);






    //LISTA DEL PRIMER SELECTOR
    const getSoftwareProjectCatalog = () => {
        services.getSoftwareProjectCatalog().subscribe((res: any) => {
            if (res.DataBeanProperties.ObjectValue) {
                setList(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties
                }))
            } else {
                toast.error("Hubo un error")
            }
        })
    }


    useEffect(() => {
        getSoftwareProjectCatalog();
    }, []);





    //LISTA DE LA TABLA
    const getDaoInfoCatalogBySoftwareModule = (IDSoftwareModule: number) => {
        setState(true);
        closeHandler();
        services.getDaoInfoCatalogBySoftwareModule(IDSoftwareModule).subscribe((res) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue) {
                setListTable(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties;
                }));
            } else {
                toast("No tiene elementos que mostrar")
            }
        })
    }



    const closeHandler = () => {
        setVisible(false);
        setValues({ name: "", description: "" });
    };


    const closeHandler2 = () => {
        setVisible2(false);
    };




    //FUNCION QUE CONTROLA SI SE CREA O EDITA
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!values.name || !values.description) {
            toast.error("Llena todos los campos");
        } else {
            if (optionSubmit) {
                crearElemento();
            } else {
                editarElemento();
            }
        }
    }





    const crearElemento = () => {
        const bean = {
            IDSoftwareModule: ref2.IDSoftwareModule,
            Description: values.description,
            IDDaoInfo: null,
            Name: values.name
        }

        services.updateDaoInfo(bean).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("Se creo correctamente");
                getDaoInfoCatalogBySoftwareModule(ref2.IDSoftwareModule);
            } else {
                toast.error("Hubo un error al crear");
                getDaoInfoCatalogBySoftwareModule(ref2.IDSoftwareModule);
            }
        })
    }



    const editarElemento = () => {

        const bean = {
            IDSoftwareModule: ref2.IDSoftwareModule,
            Description: values.description,
            IDDaoInfo: ID,
            Name: values.name
        }

        services.updateDaoInfo(bean).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("Se actualizo correctamente");
                getDaoInfoCatalogBySoftwareModule(ref2.IDSoftwareModule);
            } else {
                toast.error("Hubo un error para actualizar el elemento");
                getDaoInfoCatalogBySoftwareModule(ref2.IDSoftwareModule);
            }
        })

    }




    const eliminarElemento = () => {
        setVisible2(false);
        services.deleteDaoInfo(rowDelete.IDDaoInfo).subscribe((res) => {
            if (res.DataBeanProperties.Date) {
                toast.success("Se elimino correctamente")
                getDaoInfoCatalogBySoftwareModule(ref2.IDSoftwareModule);
            } else {
                toast.error("No se pudo eliminar la fila por un error inesperado")
            }
        })
    }





    //FUNCIONES QUE CONTROLAN LA VISUZALIZACION DE LOS SELECTORES
    const focusSelecttor1 = () => {
        setShowSelector2("0px");
        if (showSelector1 === "0px") {
            setShowSelector1("auto");
        } else if (showSelector1 === "auto") {
            setShowSelector1("0px")
        }
    }


    const focusSelecttor2 = () => {
        if (showSelector2 === "0px") {
            setShowSelector2("auto");
        } else if (showSelector2 === "auto") {
            setShowSelector2("0px")
        }
    }


    //CUANDO SE SELECCIONA EL PRIMER SELECTOR EJECUTAR UN SERVICIO QUE LLENARA EL SEGUNDO SELECTOR
    const seleccion1 = (item: any) => {
        setRef1(item);
        setSeleccio1(item.Name);
        setSeleccio2("");
        setShowSelector1("0px");
        services.getSoftwareModuleCatalog(item.IDSoftwareProject).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                setList2(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties;
                }))
            }
        })
    }



    const seleccion2 = (item: any) => {
        setRef2(item);
        setSeleccio2(item.Name);
        setShowSelector2("0px");
        getDaoInfoCatalogBySoftwareModule(item.IDSoftwareModule);
    }



    return (
        <>
            <Grid.Container>
                <Grid sm={6} css={{ padding: "5px", display: "flex", flexDirection: "column" }}>
                    <Input label="Software Project" placeholder="Found" value={seleccio1} css={{ width: "100%" }} size="lg" onClick={focusSelecttor1} />
                    <div className="selector-1" style={{ height: showSelector1 }}>
                        <ul className="lista">
                            {list.map((item: any, index: number) => {
                                return (<li key={index} onClick={() => { seleccion1(item) }}>{item.Name}</li>)
                            })}
                        </ul>
                    </div>
                </Grid>
                <Grid sm={6} css={{ padding: "5px", display: "flex", flexDirection: "column" }}>
                    <Input label="Software Module" placeholder="Found" value={seleccio2} css={{ width: "100%" }} size="lg" onClick={focusSelecttor2} />
                    <div className="selector-2" style={{ height: showSelector2 }}>
                        <ul className="lista">
                            {list2.map((item: any, index: number) => {
                                return (<li key={index} onClick={() => { seleccion2(item) }}>{item.Name}</li>)
                            })}
                        </ul>
                    </div>
                </Grid>

            </Grid.Container>

            {seleccio2 &&
                <>
                    <Button onClick={() => { setVisible(true); setOptionSubmit(true) }} css={{ fontSize: "18px", paddingRight: "10px", margin: "10px 0px" }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>
                    <Table css={{ height: "auto", minWidth: "100%" }}>
                        <Table.Header>
                            <Table.Column css={{ fontSize: "16px" }}>IDDaoInfo</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Name</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>ClassForName</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>AdapterWS</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Description</Table.Column>
                            <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {listTable.map((item: any, index: number) => {

                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{item.IDDaoInfo}</Table.Cell>
                                        <Table.Cell>{item.Name}</Table.Cell>
                                        <Table.Cell>{item.ClassForName}</Table.Cell>
                                        <Table.Cell>{item.AdapterWS}</Table.Cell>
                                        <Table.Cell>{item.Description}</Table.Cell>
                                        <Table.Cell>
                                            <div>
                                                <button className='btn-table' onClick={() => { setVisible(true); setOptionSubmit(false), setValues({ name: item.Name, description: item.Description }); setID(item.IDDaoInfo) }}><BiEdit color='white' style={{ display: "block" }} /></button>
                                                <button className='btn-table' onClick={() => { setVisible2(true); setRowDelete(item) }}><BiTrash color='white' style={{ display: "block" }} /></button>
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
                open={visible}
                onClose={closeHandler}
                css={{ padding: "20px", textAlign: "left" }}
            >
                <form onSubmit={handleSubmit}>
                    <h2>{optionSubmit ? "Crear " : "Editar"}</h2>
                    <Grid.Container gap={1}>

                        <Grid sm={12}>
                            <Input label="Nombre" css={{ width: "100%" }} size="lg" value={values.name} onChange={(e) => { setValues({ ...values, name: e.target.value }) }} />
                        </Grid>

                        <Grid sm={12}>
                            <Textarea label="Descripción" css={{ width: "100%" }} size="lg" value={values.description} onChange={(e) => { setValues({ ...values, description: e.target.value }) }} />
                        </Grid>

                        <Grid sm={12}>
                            <button className='btn-modal' style={{ margin: "15px 0px", fontSize: "18px" }} type='submit'>Guardar</button>
                        </Grid>

                    </Grid.Container>
                </form>
            </Modal>
            <Modal closeButton open={visible2} onClose={closeHandler2} css={{ padding: "50px", color: "#73777B" }}>
                <h4>¿Esta seguro de eliminar esta fila?</h4>
                <Button onClick={eliminarElemento}>Eliminar</Button>
            </Modal>
        </>

    )
}


export default DataAccessObject;

