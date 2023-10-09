import { getAllPhotos, getFullservices, insertPhoto, insertService, searchServiceId, selectServiceByid, verifyService, verifyTitle } from "../repository/service.repository.js";

export async function postService(req,res){
    const {userId} = res.locals.sessions;
    const {title, description, price, photos} = req.body;
    
    try {
        const verify = await verifyTitle(title, userId)
        if(verify.rowCount) return res.status(400).send(); 
        // insert the service
        await insertService(title,description,price,userId);
        const serviceId = await searchServiceId(title, description);
        
        // insert each photo to photos table with the respective serviceId
        await photos.forEach(ph => {
            insertPhoto(ph, serviceId.rows[0].id)
        })

        res.status(200).send();
        
      } catch (err) {
        res.status(500).send(err.message);
      }
  }

export async function getServicesById(req,res){
    const {id} = req.params;

    try {
        //verify if is exists
        const verify = await verifyService(id);
        if(!verify.rowCount) return res.status(404).send();
        // get the service by its id
        const serviceById = await selectServiceByid(id)
        res.status(200).send(serviceById.rows[0]);
        
      } catch (err) {
        res.status(500).send(err.message);
      }
  }

  
export async function getServices(req,res){
    
    try {
        // get all services
        const allServices = await getFullservices()
        let response = [...allServices.rows] 

        //get all photos 
        const getPhotos = await getAllPhotos()

        //organise the photos with the services
        response.forEach((serv) => {
            serv.photos = []
           for(let i = 0; i < getPhotos.rows.length; i++){
            if(serv.serviceId == getPhotos.rows[i].serviceId){
                serv.photos.push(getPhotos.rows[i].urlPhoto)
            }
           }
        })
       
        res.status(200).send(response);
        
      } catch (err) {
        res.status(500).send(err.message);
      }
 }

