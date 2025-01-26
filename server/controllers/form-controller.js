const { Form } = require("../models/form");

exports.saveForm = async (req, res) => {
  const { formName: form_name, formData: form_data } = req.body;

  try {
    const form = await Form.create({
      form_name,
      form_data,
    });

    res.status(201).json({ message: "Form saved successfully!", form });
  } catch (error) {
    res.status(500).json({ message: "Failed to save form", error: error.message });
  }
};

exports.fetchForm = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findByPk(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch form", error: error.message });
  }
};

exports.updateForm = async (req, res) => {
  const { id } = req.params;
  const { formName, formData } = req.body;

  try {
    const form = await Form.findByPk(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    form.form_name = formName;
    form.form_data = formData;
    await form.save();

    res.json({ message: "Form updated successfully!", form });
  } catch (error) {
    res.status(500).json({ message: "Failed to update form", error: error.message });
  }
};

exports.listForms = async (req, res) => {
  try {
    const forms = await Form.findAll({
      attributes: ["id", "form_name", "form_data","created_at", "updated_at"],
      order: [["created_at", "DESC"]],
    });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch forms", error: error.message });
  }
};
