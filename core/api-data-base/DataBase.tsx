import { Button, Grid, Input, Table } from '@nextui-org/react';
import { BiEdit, BiTrash, BiPlusCircle } from "react-icons/bi";
import { GlobalService } from '../../api/services/GlobalService';
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { context } from "../context/providerSpinner";
import { Modal } from "@nextui-org/react";
const services = new GlobalService();

interface IValues {
    Description: string,
    IDDataBase: number | null,
    Port: string,
    URL: string,
    Name: string,
    DBPassword: string,
    DBName: string,
    Destinity: string,
    DBUser: string
}


export const DataBase = () => {

    const [list, setList] = useState<any>([]);
    const { setState }: any = useContext(context);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [values, setValues] = useState<IValues>({ Description: "", IDDataBase: 0, Port: "", URL: "", Name: "", DBPassword: "", DBName: "", Destinity: "false", DBUser: "" });
    const [optionSubmit, setOptionSubmit] = useState<boolean>(true);
    const [ID, setID] = useState(0);
    const valoresAceptados = /^[0-9]+$/;


    const closeHandler = () => {
        setVisible(false);
        setValues({ Description: "", IDDataBase: 0, Port: "", URL: "", Name: "", DBPassword: "", DBName: "", Destinity: "false", DBUser: "" });
    };

    const closeHandler2 = () => {
        setVisible2(false);
    };


    const getDataBaseCatalog = () => {
        setState(true);
        closeHandler();
        services.getDataBaseCatalog(null).subscribe((res: any) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue) {
                setList(res.DataBeanProperties.ObjectValue.map((item: any) => {
                    return item.DataBeanProperties;
                }));
            } else {
                setState(false);
                toast.error("Hubo un error al cargar los datos");
            }
        })
    }


    //CARGA LOS DATOS DE LA TABLA
    useEffect(() => {
        getDataBaseCatalog();
    }, []);




    //ESTA FUNCION LLENA LOS CAMPOS CON LOS VALORES DE LA FILA
    const resetValues = (item: any) => {
        setVisible(true);
        setValues({
            Description: item.Description,
            IDDataBase: item.IDDataBase,
            Port: item.Port,
            URL: item.URL,
            Name: item.Name,
            DBPassword: item.DBPassword,
            DBName: item.DBName,
            Destinity: item.Destinity,
            DBUser: item.DBUser
        });

    }



    //FUNCION QUE CONTROLA SI SE CREA O EDITA
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!values.Port || !values.URL || !values.Name || !values.DBPassword || !values.DBName || !values.DBUser) {
            toast.error("Por favor llena todos los campos")
        } else {
            if (optionSubmit) {
                crearElemento();
            } else {
                editarElemento();
            }
        }

    }




    //FUNCIONES CREAR
    const crearElemento = () => {
        setVisible(false);
        services.updateDataBase(values.Description, null, Number(values.Port), values.URL, values.Name, values.DBPassword, values.DBName, values.Destinity, values.DBUser).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("El elemento se creo correctamente");
                getDataBaseCatalog();
            } else {
                toast.error("Hubo un error al intentar crear");
            }
        })

    }




    //FUNCION DE EDITAR
    const editarElemento = () => {
        setVisible(false);
        console.log("ediytar", values)
        services.updateDataBase(values.Description, ID, Number(values.Port), values.URL, values.Name, values.DBPassword, values.DBName, values.Destinity, values.DBUser).subscribe((res) => {
            if (res.DataBeanProperties.ObjectValue) {
                toast.success("El edito correctamente");
                getDataBaseCatalog();
            } else {
                toast.error("Hubo un error al intentar editar");
            }
        })

    }



    const eliminarElemento = () => {
        services.deleteDataBase(ID).subscribe((res) => {
            if (res.DataBeanProperties.Type === 0) {
                toast.success("Eliminado con exito");
                closeHandler2();
                getDataBaseCatalog();
            } else {
                toast.error("Ocurrio un error al intentar eliminar");
            }
        })
    }


    //ESQUELETO DE LA TABLA REMPLAZAR SOLO EL {dataTable}
    return (

        <>
            <Button onClick={() => { setVisible(true); setOptionSubmit(true); }} css={{ fontSize: "18px", paddingRight: "10px", margin: "10px 0px" }}>Crea un elemento <BiPlusCircle size={25} style={{ margin: "0px 5px" }} /></Button>
            <Table css={{ height: "auto", minWidth: "100%" }}>
                <Table.Header>
                    <Table.Column css={{ fontSize: "16px" }}>ID</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Esquema</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Destinity</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Usuario DB</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Contraseña DB</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Nombre DB</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Puerto</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>URL</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Descripción</Table.Column>
                    <Table.Column css={{ fontSize: "16px" }}>Acciones</Table.Column>
                </Table.Header>
                <Table.Body>
                    {list.map((item: any, index: number) => {

                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{item.IDDataBase}</Table.Cell>
                                <Table.Cell>{item.Name}</Table.Cell>
                                <Table.Cell>{item.Destinity ? <BiCheckCircle color='#2B7A0B' size={25} /> : <BiXCircle color='#FF1E00' size={25} />}</Table.Cell>
                                <Table.Cell>{item.DBUser}</Table.Cell>
                                <Table.Cell>{item.DBPassword}</Table.Cell>
                                <Table.Cell>{item.DBName}</Table.Cell>
                                <Table.Cell>{item.Port}</Table.Cell>
                                <Table.Cell>{item.URL}</Table.Cell>
                                <Table.Cell>{item.Description}</Table.Cell>
                                <Table.Cell>
                                    <div>
                                        <button className='btn-table' onClick={() => { resetValues(item); setOptionSubmit(false); setID(item.IDDataBase) }}><BiEdit color='white' style={{ display: "block" }} /></button>
                                        <button className='btn-table' onClick={() => { setID(item.IDDataBase); setVisible2(true) }} ><BiTrash color='white' style={{ display: "block" }} /></button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <Modal
                closeButton
                open={visible}
                onClose={closeHandler}
                css={{ padding: "20px", textAlign: "left" }}
            >
                <form onSubmit={handleSubmit}>
                    <h2>{optionSubmit ? "Crear " : "Editar"}</h2>
                    <Grid.Container gap={1}>
                        <Grid sm={6}>
                            <Input label="Esquema" value={values.Name} onChange={(e) => { setValues({ ...values, Name: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input maxLength={8} label="DB Puerto" type="number" value={values.Port} onChange={(e) => { setValues({ ...values, Port: e.target.value.match(valoresAceptados) ? e.target.value : values.Port }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="DB User" value={values.DBUser} onChange={(e) => { setValues({ ...values, DBUser: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="Nombre DB" value={values.DBName} onChange={(e) => { setValues({ ...values, DBName: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>
                            <Input label="DB Password" value={values.DBPassword} onChange={(e) => { setValues({ ...values, DBPassword: e.target.value }) }} />
                        </Grid>

                        <Grid sm={6}>

                            <Input

                                value={values.Destinity}
                                contentRightStyling={false}
                                label="Destinity"
                                contentRight={
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <BiCheckCircle color='#2B7A0B' style={{ cursor: "pointer" }} size={25} onClick={() => { setValues({ ...values, Destinity: "true" }) }} />
                                        <BiXCircle color='#FF1E00' style={{ cursor: "pointer" }} size={25} onClick={() => { setValues({ ...values, Destinity: "false" }) }} />
                                    </div>
                                }
                            />
                        </Grid>
                        <Grid sm={6}>
                            <Input label="URL" value={values.URL} onChange={(e) => { setValues({ ...values, URL: e.target.value }) }} />
                        </Grid>
                        <Grid sm={6}>
                            <Input label="Descripción" value={values.Description} onChange={(e) => { setValues({ ...values, Description: e.target.value }) }} />
                        </Grid>
                        <Grid sm={12}>
                            <button className='btn-modal' style={{ fontSize: "18px", margin: "0px 0px 20px 0px" }}>Guardar</button>
                        </Grid>
                    </Grid.Container>
                </form>
            </Modal>

            <Modal closeButton open={visible2} onClose={closeHandler2} css={{ padding: "50px", color: "#73777B" }}>
                <h4>¿Esta seguro de eliminar esta fila?</h4>
                <Button onClick={eliminarElemento}>Eliminar</Button>
            </Modal>
        </>
    );


}


export default DataBase;
