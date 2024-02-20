import User from "../../models/user";
import MemberRequest from "../../models/MemberRequest";

export async function PUT(req) {
    const { name, email, schoolname, role, description } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            const newMemberRequest = new MemberRequest({
                name,
                email,
                schoolname,
                role,
                description,
            });
            await newMemberRequest.save();
            res.status(201).json({ message: "Member request created successfully" });
        } else {
            res.status(400).json({ message: "User with this email already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


