'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [

      { key: 'USER:GET' , description: "مشاهده ی لیست کاربران و اطلاعات آنها" , created_at: new Date() , updated_at: new Date()},
      { key: 'USER:UPDATE', description: "ویرایش پروفایل و اطلاعات کاربر", created_at: new Date() , updated_at: new Date()},
      { key: 'USER:DELETE', description: "حذف کردن و بن کردن کاربران" , created_at: new Date() , updated_at: new Date()},

      { key: 'COURSE:GET', description: "مشاهده ی لیست دوره ها و اطلاعات آنها", created_at: new Date() , updated_at: new Date()},
      { key: 'COURSE:INSERT', description: "اضافه کردن دوره جدید" , created_at: new Date() , updated_at: new Date()},
      { key: 'COURSE:UPDATE', description:"ویرایش اطلاعات دوره" , created_at: new Date() , updated_at: new Date()},
      { key: 'COURSE:DELETE', description: "حذف کردن و قطع کردن دسترسی به دوره", created_at: new Date() , updated_at: new Date()},

      { key: 'COMMENT:GET', description: "مشاهده ی لیست کامنت ها", created_at: new Date() , updated_at: new Date()},
      { key: 'COMMENT:INSERT', description:"ثبت پاسخ برای کامنت های کاربران", created_at: new Date() , updated_at: new Date()},
      { key: 'COMMENT:DELETE', description: "حذف کردن کامنت های کاربران", created_at: new Date() , updated_at: new Date()},

      { key: 'ARTICLE:GET', description:"مشاهده ی لیست همه ی مقاله ها", created_at: new Date() , updated_at: new Date()},
      { key: 'ARTICLE:INSERT', description:"اضافه کردن مقاله جدید", created_at: new Date() , updated_at: new Date()},
      { key: 'ARTICLE:UPDATE', description: "ویرایش مقاله ها", created_at: new Date() , updated_at: new Date()},
      { key: 'ARTICLE:DELETE', description:"حذف کردن مقاله", created_at: new Date() , updated_at: new Date()},

      { key: 'BOOK:GET', description:"مشاهده ی لیست کتاب ها", created_at: new Date() , updated_at: new Date()},
      { key: 'BOOK:INSERT', description:"افزودن کتاب جدید", created_at: new Date() , updated_at: new Date()},
      { key: 'BOOK:UPDATE', description:"ویرایش اطلاعات کتاب", created_at: new Date() , updated_at: new Date()},
      { key: 'BOOK:DELETE', description:"حذف کتاب و خارج کردن آنها از دسترس ", created_at: new Date() , updated_at: new Date()},

      { key: 'CONTACT:GET', description:"مشاهده ی لیست پیغام های کاربران", created_at: new Date() , updated_at: new Date()},
      { key: 'CONTACT:INSERT', description:"فرستادن پاسخ برای پیغام های کابران", created_at: new Date() , updated_at: new Date()},
      { key: 'CONTACT:DELETE', description:"حذف کردن پیغام های کاربران", created_at: new Date() , updated_at: new Date()},

      { key: 'FILE:GET', description:"مشاهده ی لیست فایل ها", created_at: new Date() , updated_at: new Date()},
      { key: 'FILE:INSERT', description:"اضافه کردن فایل جدید", created_at: new Date() , updated_at: new Date()},
      { key: 'FILE:UPDATE', description:"ویرایش فایل ها", created_at: new Date() , updated_at: new Date()},
      { key: 'FILE:DELETE', description:"حذف کردن فایل", created_at: new Date() , updated_at: new Date()},

      { key: 'OFF:GET', description:"مشاهده ی لیست تخفیف ها", created_at: new Date() , updated_at: new Date()},
      { key: 'OFF:INSERT', description:"ثبت تخفیف جدید", created_at: new Date() , updated_at: new Date()},
      { key: 'OFF:DELETE', description:"حذف تخفیف", created_at: new Date() , updated_at: new Date()},
      
      { key: 'ROLE:GET', description:"مشاهده ی لیست نقش ها", created_at: new Date() , updated_at: new Date()},
      { key: 'ROLE:INSERT', description:"افزودن نقش جدید", created_at: new Date() , updated_at: new Date()},
      { key: 'ROLE:UPDATE', description:"ویرایش دسترسی های کاربران", created_at: new Date() , updated_at: new Date()},

      { key: 'SALE:GET', description:"مشاهده ی لیست فروش ها", created_at: new Date() , updated_at: new Date()},
      { key: 'SALE:INSERT', description:"فعال کردن دوره برای کاربران", created_at: new Date() , updated_at: new Date()},
      { key: 'SALE:DELETE', description:"حذف کردن اطلاعات فروش از لیست", created_at: new Date() , updated_at: new Date()},

      { key: 'SESSION:GET', description:"مشاهده ی لیست جلسه ها", created_at: new Date() , updated_at: new Date()},
      { key: 'SESSION:INSERT', description:"افزودن و ویرایش جلسه ی دوره", created_at: new Date() , updated_at: new Date()},
      { key: 'SESSION:DELETE', description:"حذف کردن جلسه از دوره", created_at: new Date() , updated_at: new Date()},

      { key: 'TAG:GET', description:"مشاهده ی لیست تگ ها", created_at: new Date() , updated_at: new Date()},
      { key: 'TAG:INSERT', description:"افزودن تگ جدید", created_at: new Date() , updated_at: new Date()},
      { key: 'TAG:UPDATE', description:"ویرایش تگ ها", created_at: new Date() , updated_at: new Date()},
      { key: 'TAG:DELETE', description:"حذف کردن تگ", created_at: new Date() , updated_at: new Date()},

      { key: 'TICKET:GET', description:"مشاهده ی لیست تیکت ها", created_at: new Date() , updated_at: new Date()},
      { key: 'TICKET:UPDATE', description:"ارسال پاسخ به تیکت و بستن آنها", created_at: new Date() , updated_at: new Date()},
      { key: 'TICKET:DELETE', description:"حذف کردن تیکت", created_at: new Date() , updated_at: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permission",null,{});
  }
};
