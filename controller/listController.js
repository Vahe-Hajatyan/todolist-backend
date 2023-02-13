import ListModel from "../model/List.js";

export const setList = async (req, res) => {
  try {
    const doc = new ListModel({
      text: req.body.text,
      done: req.body.done,
      user: req.userId,
    });
    const list = await doc.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось создать заметку",
      err,
    });
  }
};

export const getList = async (req, res) => {
  try {
    const list = await ListModel.find();

    const userList = list.map((obj) => {
      return obj.user === req.userId ? obj : null;
    });
    const filtered = userList.filter((el) => {
      return el != null;
    });
    res.json(filtered);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить заметку",
      err,
    });
  }
};
export const updateList = async (req, res) => {
  try {
    const params = req.body._id;

    await ListModel.findByIdAndUpdate(
      { _id: params },
      {
        done: req.body.done,
        text: req.body.text,
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось обновить заметку",
      err,
    });
  }
};
export const deleteList = (req, res) => {
  try {
    const params = req.params.id;

    ListModel.findByIdAndDelete({ _id: params }, (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Не удалось удалить заметку", err });
      }
      if (!doc) {
        res.status(404).json({ message: "заметка не найдена" });
      }
      res.json({ success: true });
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось удалить заметку",
      err,
    });
  }
};
