import { Button, Card, Input, Table, Textarea } from '@nextui-org/react';
import { BiEdit, BiTrash, BiPlusCircle, BiFile } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Modal } from '@nextui-org/react';
import { GlobalService } from '../../api/services/GlobalService';
import toast from 'react-hot-toast';
import { useContext } from "react";
import { context } from "../context/providerSpinner";
const services = new GlobalService();


export const WebService = () => {


    const { setState }: any = useContext(context);
    const [list, setList] = useState<any>([]);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visibleMethod, setVisibleMethod] = useState(false);
    const [values, setValues] = useState({ name: "", classforName: "", description: "" });
    const [optionSubmit, setOptionSubmit] = useState<boolean>(true);
    const [ID, setID] = useState(0);
    const [metodos, setMetodos] = useState<any>([]);
    const [visibleJson, setVisibleJson] = useState<boolean>(false);
    const [json, setJson] = useState<any>(null);



    const getWebServiceInfoCatalog = () => {
        closeHandler();
        setState(true);
        services.getWebServiceInfoCatalog().subscribe((res) => {
            setState(false);
            setList(res.DataBeanProperties.ObjectValue.map((item: any) => {
                return item.DataBeanProperties
            }));
        })
    }


    useEffect(() => {
        getWebServiceInfoCatalog();
    }, []);



    const closeHandler = () => {
        setVisible(false);
        setVisible2(false);
        setValues({ name: "", classforName: "", description: "" })
    };


    const closeHandler2 = () => {
        setVisible2(false);
    };

    const closeMetodos = () => {
        setVisibleMethod(false);
    };


    const openModalJson = () => {
        setVisibleJson(true);
    }


    const closeModalJson = () => {
        setVisibleJson(false);
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!values.name || !values.classforName || !values.description) {
            toast.error("Llena todos los campos")
        } else {
            if (optionSubmit) {
                crearElemento(values.name, values.classforName, values.description);
            } else {
                editarElemento();
            }

        }

    }


    //FUNCIONES DEL CRUD
    const crearElemento = (name: string, classforName: string, description: string) => {
        services.parseAppDeploymentStructureFor(name, classforName, description).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("Se creo correctamente");
                getWebServiceInfoCatalog();
            } else {
                setVisible(false);
                toast.error("Hubo un error inesperado, no se pudo crear");
            }
        })
    }

    const editarElemento = () => {
        services.parseAppDeploymentStructureForUpdate(values.name, values.description).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("Se actualizo correctamente");
                getWebServiceInfoCatalog();
            } else {
                setVisible(false);
                toast.error("Hubo un error inesperado, no se pudo actualizar");
            }
        })
    }



    const eliminarElemento = () => {
        services.deleteWebServiceInfo(ID).subscribe((res: any) => {
            if (res.DataBeanProperties) {
                toast.success("Eliminado con exito");
                getWebServiceInfoCatalog();
            } else {
                toast.error("No se puedo eliminar")
            }
        })
    }


    const listarMetodos = (id: number) => {
        setState(true);
        services.getDataBeanMethod(id).subscribe((res) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue) {
                setMetodos(res.DataBeanProperties.ObjectValue);
                setVisibleMethod(true);
            } else {
                toast.error("No se puedo cargar los metodos");
            }
        })
    }



    //ESQUELETO DE LA TABLA REMPLAZAR SOLO EL {dataTable}
    return (
        <>

            {metodos.length ?

                <Modal width="600px" closeButton open={visibleMethod} onClose={closeMetodos} css={{ padding: "25px", height: "500px", overflowY: "scroll" }}>
                    <Modal width="500px" css={{ padding: "20px" }} closeButton open={visibleJson} onClose={closeModalJson}>
                        <span style={{ color: "#E38B29", height: "auto", width: "100%", textOverflow: "ellipsis", wordWrap: "break-word", whiteSpace: "break-spaces", display: "flex", flexDirection: "column", textAlign: "initial" }}>{json}</span>
                    </Modal>

                    {metodos.map((item: any) => {
                        return (
                            <div className='cardMetodo'>
                                <span style={{ display: "block", color: "#E38B29" }}><strong>ID</strong></span>
                                <span>{item.DataBeanProperties.IDDataBeanInfo}</span>
                                <span style={{ display: "block", color: "#E38B29" }}><strong>WebServiceAdapter</strong></span>
                                <span>{item.DataBeanProperties.WebServiceAdapter}</span>
                                <span style={{ display: "block", color: "#E38B29" }}><strong>Method</strong></span>
                                <span>{item.DataBeanProperties.Method}</span>
                                <span style={{ display: "block", color: "#E38B29" }}><strong>Parametters</strong></span>
                                <span>{item.DataBeanProperties.Parametters}</span>
                                <span style={{ display: "block", color: "#E38B29" }}><strong>ReturnType</strong></span>
                                <span>{item.DataBeanProperties.ReturnType}</span>
                                <span style={{ display: "block", color: "#E38B29" }}><strong>Hash</strong></span>
                                <span>{item.DataBeanProperties.Hash}</span>
                                <Button css={{ margin: "10px 0px" }} onClick={() => { openModalJson(), setJson(item.DataBeanProperties.Json) }}>Ver JSON</Button>
                            </div>
                        )
                    })}

                </Modal>


                :
                <Modal closeButton open={visibleMethod} onClose={closeMetodos} css={{ padding: "20px" }}>
                    <h2>No tiene metodos</h2>
                </Modal>


            }



            <Button css={{ fontSize: "18px", paddingRight: "10px", margin: "10px 0px" }} onClick={() => { setVisible(true); setOptionSubmit(true) }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>
            <Table css={{ height: "auto", minWidth: "100%" }}>
                <Table.Header>
                    <Table.Column css={{ fontSize: "16px", width: "20px" }}>IDWebServiceInfo</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Name</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>ClassForName</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Description</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                </Table.Header>
                <Table.Body>
                    {list.map((item: any, index: number) => {
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{item.IDWebServiceInfo}</Table.Cell>
                                <Table.Cell>{item.Name}</Table.Cell>
                                <Table.Cell>{item.ClassForName}</Table.Cell>
                                <Table.Cell>{item.Description}</Table.Cell>

                                <Table.Cell>
                                    <div>
                                        <button className='btn-table' onClick={() => { listarMetodos(item.IDWebServiceInfo) }}> <BiFile color='white' style={{ display: "block" }} /></button>
                                        <button className='btn-table' onClick={() => { setID(item.IDWebServiceInfo); setOptionSubmit(false); setVisible(true); setValues({ name: item.Name, classforName: item.ClassForName, description: item.Description }) }}><BiEdit color='white' style={{ display: "block" }} /></button>
                                        <button className='btn-table' onClick={() => { setID(item.IDWebServiceInfo); setVisible2(true) }}><BiTrash color='white' style={{ display: "block" }} /></button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>

            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                css={{ textAlign: "left" }}
            >
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <h2>{optionSubmit ? "Crear" : "Editar"}</h2>
                        <Input size='lg' label="Nombre" value={values.name} onChange={(e) => { setValues({ ...values, name: e.target.value }) }} />
                        <Input size='lg' label="Clase por nombre" value={values.classforName} onChange={(e) => { setValues({ ...values, classforName: e.target.value }) }} />
                        <Textarea size='lg' label="Descripción" value={values.description} onChange={(e) => { setValues({ ...values, description: e.target.value }) }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='btn-modal' style={{ margin: "0px 0px 30px 0px", fontSize: "18px" }}>
                            Guardar
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal closeButton open={visible2} onClose={closeHandler2} css={{ padding: "50px", color: "#73777B" }}>
                <h4>¿Esta seguro de eliminar esta fila?</h4>
                <Button onClick={eliminarElemento}>Eliminar</Button>
            </Modal>

        </>
    )
}

export default WebService;
