const Record = require("../models/Record");
const mongoose = require("mongoose");

// get homepage
exports.homepage = async (req, res) => {

    const messages = await req.consumeFlash('info');
    const locals = {
      title: 'สมุดบัญชีจดบันทึก',
      description: 'Free NodeJs User Management System'
    }

    let perPage = 12;
    let page = req.query.page || 1;

    try {
      const records = await Record.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Record.count();

      res.render('index', {
        locals,
        records,
        current: page,
        pages: Math.ceil(count / perPage),
        messages
      });

    } catch (error) {
      console.log(error);
    }
}

// get about
exports.about = async (req, res) => {
    const locals = {
      title: 'เกี่ยวกับ',
      description: 'Free NodeJs User Management System'
    }

    try {
      res.render('about', locals );
    } catch (error) {
      console.log(error);
    }
}

// get new record form
exports.addRecord = async (req, res) => {
  const locals = {
    title: "เพิ่มบันทึกรายรับ-รายจ่าย",
    description: "Free NodeJs User Management System",
  };

  res.render("record/add", locals);
};

//post create new record
exports.postRecord = async (req, res) => {
  console.log(req.body);

  const newRecord = new Record({
    day: req.body.day,
    month: req.body.month,
    details: req.body.details,
    year: req.body.year,
  });

  try {
    await Record.create(newRecord);
    await req.flash("info", "New record has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

//get record data 
exports.view = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id })

    const locals = {
      title: "ดูรายการ",
      description: "Free NodeJs User Management System",
    };
    res.render('record/view', {
      locals,
      record
    })
  } catch (error) {
    console.log(error);
  }
}

//get edit Record Data 
exports.edit = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id })

    const locals = {
      title: "แก้ไขรายการ",
      description: "Free NodeJs User Management System",
    };
    res.render('record/edit', {
      locals,
      record
    })
  } catch (error) {
    console.log(error);
  }
}

//get update record data 
exports.editPost = async (req, res) => {
  try {
    await Record.findByIdAndUpdate(req.params.id,{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now()
    });
    await res.redirect(`/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}

//delete record data 
exports.deleteRecord = async (req, res) => {
  try {
    await Record.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

//get search Record Data (ระบบระเบิดไปแล้ว ทำไม่สำเร็จ)
/*exports.searchRecords = async (req, res) => {

  const locals = {
    title: "Search Record Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const records = await Record.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
      ]
    });
    res.render("search", {
      records,
      locals
    })
  } catch (error) {
    console.log(error);
  }
}*/