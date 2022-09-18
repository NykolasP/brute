import express, { Response, Request } from "express";
import { render } from "ejs";
import { getConnexion,getAll,addUser,getByEmail } from "./model/utilisateur";
import cookieSession from "cookie-session"
import { IUtilisateur } from "./interfaces/utilisateur";
import { getAllRobotExpectUser, getRobot, getUserRobot } from "./model/robot";
import { IRobot } from "./interfaces/robot";

import { Robot } from "./classe/robot"
import { getAllItems } from "./model/item";
import { IItem } from "./interfaces/items";
import { addItemRobot, getAllItemsRobot, getAllItemsShop } from "./model/shop";

const Utilisateur = require('./classe/utilisateur')


export default class Server {
    readonly port:number

    constructor(port: number){
        this.port = port
    }

    start() {
        const app = express()

        app.set('views', './src/vues');
        app.set('view engine', 'ejs');
        app.use(express.urlencoded({ extended: false }))

        app.use(cookieSession({
            name: 'session',
            keys: ['key1']
        }))

        let profil: IUtilisateur[] = []
        let robot: IRobot[] = []
        let items:IItem[] = []

        app.listen(this.port, () => {
            console.log('Serveur démarré sur le port : ' + this.port)
        })

        app.get('/', (req, res) => {
            if (req.session && req.session.email) {
                res.render('index',{userConnected: req.session.email})
            } else {
                res.render('index',{userConnected: null})
            }
        })

        app.get('/deconnexion', (req, res) => {
            if (req.session && req.session.email) {
                req.session = null
                res.render('index',{userConnected: null})
            }
        })

        app.get('/connexion', (req, res) => {
            if (req.session && req.session.email) {
                req.session.email = req.body.login
                getByEmail(req.session.email).then((data:any) => {
                    profil = data
                    getUserRobot(data['id']).then((robotData:any) =>{
                        robot = robotData
                        
                        if (robot) {
                            res.render('profil',{userConnected: data.email, profilUtilisateur: profil, robotUtilisateur: robot})
                        } else {
                            res.render('profil',{userConnected: data.email, profilUtilisateur: profil, robotUtilisateur: null})
                        }
                    })
                })
            } else {
                res.render('connexion',{userConnected: null})
            }
        })

        app.post('/connexion', (req, res) => {
            getConnexion(req.body.login,req.body.mdp).then((data:any) => {
                if (req.session) {
                    req.session.email = req.body.login
                    res.redirect("/profil")
                }
            })
        })

        app.get('/inscription', (req, res) => {
            if (req.session && req.session.email) {
                req.session.email = req.body.login
                getByEmail(req.session.email).then((data:any) => {
                    profil = data
                    getUserRobot(data['id']).then((robotData:any) =>{
                        robot = robotData
                        
                        if (robot) {
                            res.render('profil',{userConnected: data.email, profilUtilisateur: profil, robotUtilisateur: robot})
                        } else {
                            res.render('profil',{userConnected: data.email, profilUtilisateur: profil, robotUtilisateur: null})
                        }
                    })
                })
            } else {
                res.render('inscription',{userConnected: null})
            }
            
        })

        app.post('/inscription', (req, res) => {
            let newUtilisateur = new Utilisateur()
            newUtilisateur.addUtilisateur(req.body.login, req.body.mdp, req.body.nom, req.body.prenom)
            if (req.session) {
                req.session.email = req.body.login
                res.redirect("/profil")
            }
        })

        app.get('/profil', (req, res) => {
            if (req.session && req.session.email) {
                getByEmail(req.session.email).then((data:any) => {
                    let profil = data
                    getUserRobot(data['id']).then((robotData:any) =>{
                        let robot = robotData
                        getAllItemsRobot(data['id']).then((dataitem:any) =>{
                            let itemRobot = dataitem

                            if (robot) {
                                res.render('profil',{userConnected: profil.email, profilUtilisateur: profil, robotUtilisateur: robot, items: itemRobot})
                            } else {
                                res.render('profil',{userConnected: profil.email, profilUtilisateur: profil, robotUtilisateur: null, items: null})
                            }
                        })

                    })
                })
            } else {
                res.render('index',{userConnected: null})
            }
        })

        app.post('/profil', (req, res) => {
            if (req.session && req.session.email) {
                getByEmail(req.session.email).then((data:any) => {
                    profil = data
                    let robot = new Robot(req.body.pseudo,2,1,0,10,1,0,50,data.email,data['id'])
                    robot.addRobotUser()
                    res.redirect("/profil")
                })
            }
            
        })

        app.get('/listes', (req, res) => {
            if (req.session && req.session.email) {
                getByEmail(req.session.email).then((data:any) => {
                    profil = data
                    getUserRobot(data['id']).then((robotData:any) =>{
                        robot = robotData
                        getAllRobotExpectUser(robotData['id']).then((datalistes:any) =>{
                            robot = [...datalistes]
                            res.render('listes',{userConnected: data['email'],idrobotUser: robotData['id'], listesRobot: robot})
                        })
                    })
                })
            }
        })

        app.get('/combat/:robot1/:robot2', (req, res) => {
            if (req.session && req.session.email) {
                getRobot(req.params.robot1).then((a:any) => {
                    let IRobotOne: IRobot = a
                    let robotOne = new Robot(
                        IRobotOne['pseudo'],
                        IRobotOne['force'],
                        IRobotOne['esquive'],
                        IRobotOne['defense'],
                        IRobotOne['pv'],
                        IRobotOne['niveau'],
                        IRobotOne['experience'],
                        IRobotOne['argent'],
                        IRobotOne['email'],
                        IRobotOne['id_compte'])
                    
                    getRobot(req.params.robot2).then((b:any) => {
                        let IRobotTwo: IRobot = b
                    let robotTwo = new Robot(
                        IRobotTwo['pseudo'],
                        IRobotTwo['force'],
                        IRobotTwo['esquive'],
                        IRobotTwo['defense'],
                        IRobotTwo['pv'],
                        IRobotTwo['niveau'],
                        IRobotTwo['experience'],
                        IRobotTwo['argent'],
                        IRobotTwo['email'],
                        IRobotTwo['id_compte'])

                        let resultat = robotOne.combat(robotTwo)
                        if (req.session && req.session.email) {
                            res.render('combat',{userConnected: req.session.email, combats: resultat})
                        }
                    })
                })
            } else {
                res.render('inscription',{userConnected: null})
            }
            
        })

        app.get('/shop', (req, res) => {
            if (req.session && req.session.email) {
                let email = req.session.email
                getByEmail(req.session.email).then((data:any) => {
                    let infoUtilisateur = data
                    getAllItemsShop().then((data:any) =>{
                        res.render('shop',{userConnected: email,userId: infoUtilisateur['id'],items: data})    
                    })
                    
                })
            } else {
                res.render('index',{userConnected: null})
            }
        })

        app.get('/shop/:idUtilisateur/:idItem', (req, res) => {
            if (req.session && req.session.email) {
                addItemRobot(req.params.idUtilisateur,req.params.idItem)
                let email = req.session.email
                getByEmail(req.session.email).then((data:any) => {
                    let infoUtilisateur = data
                    getAllItemsShop().then((data:any) =>{
                        res.render('shop',{userConnected: email,userId: infoUtilisateur['id'],items: data})    
                    })
                    
                })
            } else {
                res.render('index',{userConnected: null})
            }
        })
    }
}