"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botiquinController = void 0;
const Medicamento_1 = require("../models/Medicamento");
const readLine = __importStar(require("readline"));
class botiquinController {
    constructor() {
        // to do a list about medicamento
        this.medicamento = [];
        this.scanner = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    showMenu() {
        console.log('=====================================');
        console.log('***** (BOTIQUIN DEL HOSPITAL) ******');
        console.log('====================================');
        console.log('1.Agregar el medicamento');
        console.log('2.Mostrar el medicamento');
        console.log('3.Buscar el medicamento');
        console.log('4.Actualizar medicamento');
        console.log('5.Eliminar medicamento');
        console.log('6.Crear la requisicion');
        console.log('7.Salir');
        this.scanner.question('Choose an option please: ', (option) => {
            this.showMethods(parseInt(option));
        });
    }
    showMethods(option) {
        switch (option) {
            case 1:
                this.createMedicine();
                break;
            case 2:
                this.showMedicine();
                break;
            case 3:
                this.scanner.question('Buscar medicamento por nombre:', (medicine) => {
                    const newMed = medicine;
                    this.findMedicine(newMed);
                });
                break;
            case 4:
                this.scanner.question('Modificar medicamento por id:', (id) => {
                    const newid = id;
                    this.updateMedicine(newid);
                });
                break;
            case 5:
                this.scanner.question('Eliminar medicamento por nombre:', (medicine) => {
                    const newfar = medicine;
                    this.deleteMedicine(newfar);
                });
                break;
            case 6:
                this.scanner.question('Escriba el nombre de un medicamento pora requisar:', (medicine) => {
                    const med = medicine;
                    this.requisition(med);
                });
                break;
            case 7:
                this.scanner.close();
                break;
            default:
                console.log('INVALID OPTION!!!!');
                this.showMenu();
                break;
        }
    }
    createMedicine() {
        this.scanner.question('Write the name of the medicine: ', (medicine) => {
            this.scanner.question('Write the amount of the medicine: ', (amount) => {
                this.scanner.question('Write the expiration date of the medicine ', (expireDate) => {
                    this.scanner.question('Write some description about the medicine', (description) => {
                        const newMedicine = new Medicamento_1.Medicamento(this.medicamento.length + 1, medicine, parseInt(amount), new Date(), description);
                        this.medicamento.push(newMedicine);
                        this.showMessage('The medicine has been added ', newMedicine);
                        this.showMenu();
                    });
                });
            });
        });
    }
    showMedicine() {
        if (this.medicamento.length == 0) {
            console.log("No Medicines found");
            this.showMenu();
        }
        else {
            this.medicamento.forEach((e) => {
                console.log(`ID: ${e.id} \nMedicina: ${e.medicine} \nAmount: ${e.amount} \nExpiration date: ${e.expireDate} \n =====`);
            });
            this.showMenu();
        }
    }
    findMedicine(valor) {
        if (this.medicamento.length == 0) {
            console.log("No Medicines found");
            this.showMenu();
        }
        else {
            const result = this.medicamento.find(({ medicine }) => medicine === valor);
            if (result == undefined) {
                console.log("No Medicine id found");
            }
            else {
                console.log(result);
            }
            this.showMenu();
        }
    }
    updateMedicine(valor) {
        if (this.medicamento.length == 0) {
            console.log("No Medicines found");
            this.showMenu();
        }
        else {
            const changing = this.medicamento.find(({ id }) => id === parseInt(valor));
            if (changing === undefined) {
                console.log("No Medicines found");
                this.showMenu();
            }
            else {
                this.scanner.question('Change the name of the medicine: ', (medicine) => {
                    this.scanner.question('Change the amount of the medicine: ', (amount) => {
                        this.scanner.question('Change the expiration date of the medicine ', (expireDate) => {
                            this.scanner.question('Change description about the medicine', (description) => {
                                const chnageMedicine = new Medicamento_1.Medicamento(changing.id, medicine, parseInt(amount), new Date(), description);
                                this.medicamento.forEach(item => {
                                    if (item.id === chnageMedicine.id) {
                                        item.medicine = chnageMedicine.medicine;
                                        item.amount = chnageMedicine.amount;
                                        item.expireDate = chnageMedicine.expireDate;
                                        item.description = chnageMedicine.description;
                                    }
                                });
                                console.log('The medicine with id: ' + changing.id + ' has been Modify ');
                                this.showMenu();
                            });
                        });
                    });
                });
            }
        }
    }
    deleteMedicine(valor) {
        if (this.medicamento.length == 0) {
            console.log("No Medicines found");
            this.showMenu();
        }
        else {
            const deleting = this.medicamento.find(({ medicine }) => medicine === valor);
            if (deleting == undefined) {
                console.log("No Medicines found");
                this.showMenu();
            }
            else {
                const i = this.medicamento.map(i => i.medicine).indexOf(deleting.medicine);
                var index = this.medicamento.findIndex(item => item.medicine === deleting.medicine);
                this.medicamento.splice(index, 1);
                //delete this.medicamento[i];
                console.log('The medicine with id: ' + deleting.id + ' has been deleted ');
            }
            this.showMenu();
        }
    }
    requisition(valor) {
        if (this.medicamento.length == 0) {
            console.log("No Medicines found");
            this.showMenu();
        }
        else {
            const requisition = this.medicamento.find(({ medicine }) => medicine === valor);
            if (requisition === undefined) {
                console.log("No Medicines found");
                this.showMenu();
            }
            else {
                this.scanner.question('How much medicine are you going to take: ', (amounts) => {
                    this.medicamento.forEach(item => {
                        if (item.id == requisition.id) {
                            if (item.amount >= parseInt(amounts)) {
                                item.amount -= parseInt(amounts);
                                console.log('The medicine named: ' + requisition.medicine + ' has been used ');
                            }
                            else {
                                console.log("not enugh medicine...");
                            }
                            this.showMenu();
                        }
                    });
                });
            }
        }
    }
    showMessage(message, object) {
        console.log(`${message} ${JSON.stringify(object)}`);
    }
}
exports.botiquinController = botiquinController;
