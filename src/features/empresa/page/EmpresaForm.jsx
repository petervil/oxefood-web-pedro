import { useState } from "react";
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_EMPRESA } from "../../empresa/service/empresaService";

export default function EmpresaForm() {

    const [empresa, setEmpresa] = useState({
        nomeEmpresarial: "",
        cnpj: "",
        fone: "",
        foneAlternativo: "",
        site: ""
    });

    async function salvar() {

        try {
            await cadastrar(MAPPING_CONTROLLER_EMPRESA, empresa);
            toast.success("Empresa cadastrada com sucesso!");
        } catch (erro) {
            toast.error("Erro ao cadastrar empresa.");
        }
    }

    return (

        <div>
            <Menu />

            <Breadcrumbs items={[
                { label: "Empresa" },
                { label: "Cadastrar" }
            ]} />
            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>

                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Nova Empresa
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ padding: '30px' }}>
                        <form>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nomeEmpresarial">Razão Social</label>
                                        <input
                                            type="text"
                                            id="nomeEmpresarial"
                                            className="input input-bordered w-full"
                                            value={empresa.nomeEmpresarial}
                                            onChange={(e) =>
                                                setEmpresa({ ...empresa, nomeEmpresarial: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="cnpj">CNPJ</label>
                                        <IMaskInput
                                            mask="00.000.000/000-00"
                                            value={empresa.cnpj}
                                            onAccept={(value) =>
                                                setEmpresa({ ...empresa, cnpj: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="cnpj"
                                        />
                                    </fieldset>

                                </div>
                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="fone">Telefone fixo</label>
                                        <IMaskInput
                                            mask="(00) 0000.0000"
                                            value={empresa.fone}
                                            onAccept={(value) =>
                                                setEmpresa({ ...empresa, fone: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="fone"
                                        />
                                    </fieldset>

                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="foneAlternativo">Telefone celular</label>
                                        <IMaskInput
                                            mask="(00) 0 0000.0000"
                                            value={empresa.foneAlternativo}
                                            onAccept={(value) =>
                                                setEmpresa({ ...empresa, foneAlternativo: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="foneAlternativo"
                                        />
                                    </fieldset>

                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="site">Site</label>
                                        <input
                                            type="text"
                                            id="site"
                                            className="input input-bordered w-full"
                                            value={empresa.site}
                                            onChange={(e) =>
                                                setEmpresa({ ...empresa, site: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>

                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'left' }}>
                                        <BackButton destino="/empresa" />
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
