import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { atualizar, buscarPorId, cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../../produto/service/produtoService";

export default function ProdutoForm() {

    const { idProduto } = useParams();


    const [produto, setProduto] = useState({
        id: null,
        codigo: "",
        titulo: "",
        descricao: "",
        valorUnitario: "",
        tempoEntregaMinimo: "",
        tempoEntregaMaximo: ""
    });

    useEffect(() => {
        if (idProduto) {
            carregarProduto();
        }
    }, [idProduto]);

    async function carregarProduto() {
        try {
            const data = await buscarPorId(
                MAPPING_CONTROLLER_PRODUTO,
                idProduto
            );

            setProduto({
                id: data.id,
                codigo: data.codigo ?? "",
                titulo: data.titulo ?? "",
                descricao: data.descricao ?? "",
                valorUnitario: data.valorUnitario ?? "",
                tempoEntregaMinimo: data.tempoEntregaMinimo ?? "",
                tempoEntregaMaximo: data.tempoEntregaMaximo ?? "",

            });

        } catch (erro) {
            toast.error("Erro ao carregar produto.");
        }
    }

    async function salvar() {

        try {
            if (idProduto) {
                await atualizar(MAPPING_CONTROLLER_PRODUTO, produto);
                toast.success("Produto alterado com sucesso!");
            } else {
                await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto);
                toast.success("Produto cadastrado com sucesso!");
            }
        } catch (erro) {
            toast.error("Erro ao cadastrar produto.");
        }
    }

    return (

        <div>
            <Menu />

            <Breadcrumbs items={[
                { label: "Produto" },
                { label: "Cadastrar" }
            ]} />
            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>

                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
                        {idProduto ?
                            <Breadcrumbs items={[
                                { label: "Produto" },
                                { label: "Alterar" }
                            ]} />
                            :
                            <Breadcrumbs items={[
                                { label: "Produto" },
                                { label: "Cadastrar" }
                            ]} />
                        }
                        <h1 className="text-3xl font-bold text-gray-800">
                            {idProduto ? "Alterar Produto" : "Novo Produto"}
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ padding: '30px' }}>
                        <form>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="titulo">Nome do Produto</label>
                                        <input
                                            type="text"
                                            id="titulo"
                                            className="input input-bordered w-full"
                                            value={produto.titulo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, titulo: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="descricao">Descrição</label>
                                        <input
                                            type="text"
                                            id="descricao"
                                            className="input input-bordered w-full"
                                            value={produto.descricao}
                                            onChange={(e) =>
                                                setProduto({ ...produto, descricao: e.target.value })
                                            }
                                        />
                                    </fieldset>



                                </div>
                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="codigo">Código</label>
                                        <input
                                            type="text"
                                            id="codigo"
                                            className="input input-bordered w-full"
                                            value={produto.codigo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, codigo: e.target.value })
                                            }
                                        />
                                    </fieldset>



                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="valorUnitario">Valor Unitário (R$)</label>
                                        <input
                                            type="text"
                                            id="valorUnitario"
                                            className="input input-bordered w-full"
                                            value={produto.valorUnitario}
                                            onChange={(e) =>
                                                setProduto({ ...produto, valorUnitario: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="tempoEntregaMinimo">Tempo de Entrega (mínimo)</label>
                                        <input
                                            type="text"
                                            id="tempoEntregaMinimo"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMinimo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, tempoEntregaMinimo: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="tempoEntregaMaximo">Tempo de Entrega (máximo)</label>
                                        <input
                                            type="text"
                                            id="tempoEntregaMaximo"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMaximo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, tempoEntregaMaximo: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'left' }}>
                                        <BackButton destino="/cliente" />
                                    </div>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'right' }}>
                                        <SaveButton save={() => salvar()} />
                                    </div>

                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <Footer />

        </div>

    );
}
