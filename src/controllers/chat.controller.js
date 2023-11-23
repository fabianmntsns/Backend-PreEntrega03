import { messageService } from "../services/MessageService.js"
import UserProfileDTO from "../DTO/sessionDTO.js"




export const chatViewController = async (req, res) => {
   const userChat = new UserProfileDTO(req.session.user)
   const messagesList = await messageService.get()

   res.render("chat", { messagesList, userChat })

}

