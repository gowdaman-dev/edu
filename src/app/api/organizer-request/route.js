import User from "../../models/user";
import OrganizerRequest from "../../models/OrganizerRequest";

export async function PUT(req) {
    const { name, email, schoolname, role, description } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            const newOrganizerRequest = new OrganizerRequest({
                name,
                email,
                schoolname,
                role,
                description,
            });
            await newOrganizerRequest.save();
            res.status(201).json({ message: "Organizer request created successfully" });
        } else {
            res.status(400).json({ message: "User with this email already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


