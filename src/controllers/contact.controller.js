import Contact from "../models/Contacts";

export const findAllContact = async (req, res) => {
  const contacts = await Contact.find({ user: req.userId });
  res.json(contacts);
};

export const createContact = async (req, res) => {
  const { name, lastname, phone, description, user } = req.body;

  const newContact = new Contact({
    name: name,
    lastname: lastname,
    phone: phone,
    description: description ? description : "",
    user,
  });
  newContact.user = req.userId;
  const contactSaved = await newContact.save();
  res.json(contactSaved);
};

export const findOneContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: `${req.params.id} Contact deleted successfull` });
};

export const updateTask = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);

  res.json({ message: "Task updated successfull" });
};
