import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";

import { buscarPorId, listar, remover } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_EMPRESA } from "../service/empresaService";

export default function EmpresaPage() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        const data = await listar(MAPPING_CONTROLLER_EMPRESA);
        setLista(data);
    }

    const [empresa, setEmpresa] = useState({
        id: null,
        nomeEmpresarial: "",
        nomeFantasia: "",
        cnpj: "",
        site: "",
        fone: "",
        foneAlternativo: ""
    });


    function editar(id) { }

    async function confirmarRemover(id) {
        if (!confirm("Deseja realmente excluir este empresa?")) {
            return;
        }

        try {

            await remover(MAPPING_CONTROLLER_EMPRESA, id);
            await carregar();
            toast.success("Empresa removido com sucesso!");

        } catch (erro) {

            console.error(erro);
            toast.error("Erro ao tentar remover o Empresa.");
        }
    }

    async function detalhar(id) {

        try {

            const data = await buscarPorId(
                MAPPING_CONTROLLER_EMPRESA,
                id
            );

            setEmpresa({
                id: data.id,
                nomeEmpresarial: data.nomeEmpresarial ?? "",
                nomeFantasia: data.nomeFantasia ?? "",
                cnpj: data.cnpj ?? "",
                site: data.site ?? "",
                fone: data.fone ?? "",
                foneAlternativo: data.foneAlternativo ?? ""
            });

            document.getElementById('modal-detalhar').showModal()

        } catch (erro) {
            toast.error("Erro ao carregar cliente.");
        }
    }



    return (
        <div>
            <Menu />
            <Breadcrumbs items={[
                { label: "Empresa" },
                { label: "Listar" }
            ]} />

            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>
                <div className="overflow-x-auto shadow-sm">
                    <div className="flex items-center justify-between mb-6" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Empresas
                        </h1>
                        <NewButton destino="/empresa-form" />
                    </div>
                    <div className="divider divider-info" />
                    <div className="overflow-x-auto" style={{ marginTop: '30px' }}>
                        <table className="table table-zebra">
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>Razão Social</th>
                                    <th>Nome Fantasia</th>
                                    <th>CNPJ</th>
                                    <th>Site</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map(empresa => (
                                    <tr key={empresa.id}>
                                        <td style={{ width: '10%' }}>{empresa.nomeEmpresarial}</td>
                                        <td style={{ textAlign: 'center' }}>{empresa.nomeFantasia}</td>
                                        <td style={{ textAlign: 'center' }}>{empresa.cnpj}</td>
                                        <td style={{ textAlign: 'center' }}>{empresa.site}</td>

                                        <td style={{ textAlign: 'center' }}>
                                            <CrudActions
                                                onDetail={() => detalhar(empresa.id)}
                                                onEdit={() => editar(empresa.id)}
                                                onDelete={() => confirmarRemover(empresa.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <dialog id="modal-detalhar" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Dados da Empresa</h3>
                    <div className="divider" />
                    <p className="py-4">
                        <strong>Nome Empresarial:</strong> {empresa.nomeEmpresarial}
                    </p>
                    <p className="py-4">
                        <strong>Nome Fantasia:</strong> {empresa.nomeFantasia}
                    </p>
                    <p className="py-4">
                        <strong>CNPJ:</strong> {empresa.cnpj}
                    </p>
                    <p className="py-4">
                        <strong>Site:</strong> {empresa.site}
                    </p>
                    <p className="py-4">
                        <strong>Fone Celular:</strong> {empresa.fone}
                    </p>
                    <p className="py-4">
                        <strong>Fone Alternativo:</strong> {empresa.foneAlternativo}
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Footer />
        </div>
    );
}
