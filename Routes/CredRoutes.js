import { Router } from "express";
import { signup, login, handleHighestScore, getHighestScore, leaderboard } from "../Controllers/CredController.js"; // Add .js extension

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/highscore", handleHighestScore);
router.get("/gethighscore/:id", getHighestScore);
router.get("/leaderboard", leaderboard)



export default router; // Use export default for ES Modules
