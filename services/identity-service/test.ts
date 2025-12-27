  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      { name: 'MANAGER' },
      { name: 'ADMIN' },
      { name: 'USER' },
      { name: 'TEACHER' },
      { name: 'WRITTER' },
      { name: 'TEACHERWRITTER' },
    ]);

    await queryInterface.bulkInsert('levels', [
      { name: 'A1' },
      { name: 'A2' },
      { name: 'B1' },
      { name: 'B2' },
      { name: 'C1' },
      { name: 'C2' },
    ]);

    await queryInterface.bulkInsert('permissions', [

      { key: 'USER:GET' , description: "مشاهده ی لیست کاربران و اطلاعات آنها"},
      { key: 'USER:UPDATE', description: "ویرایش پروفایل و اطلاعات کاربر"},
      { key: 'USER:DELTE', description: "حذف کردن و بن کردن کاربران" },

      { key: 'COURSE:GET', description: "مشاهده ی لیست دوره ها و اطلاعات آنها"},
      { key: 'COURSE:INSERT', description: "اضافه کردن دوره جدید" },
      { key: 'COURSE:UPDATE', description:"ویرایش اطلاعات دوره" },
      { key: 'COURSE:DELETE', description: "حذف کردن و قطع کردن دسترسی به دوره"},

      { key: 'COMMENT:GET', description: "مشاهده ی لیست کامنت ها"},
      { key: 'COMMENT:INSERT', description:"ثبت پاسخ برای کامنت های کاربران"},
      { key: 'COMMENT:DELETE', description: "حذف کردن کامنت های کاربران"},

      { key: 'ARTICLE:GET', description:"مشاهده ی لیست همه ی مقاله ها"},
      { key: 'ARTICLE:INSERT', description:"اضافه کردن مقاله جدید"},
      { key: 'ARTICLE:UPDATE', description: "ویرایش مقاله ها"},
      { key: 'ARTICLE:DELETE', description:"حذف کردن مقاله"},

      { key: 'BOOK:GET', description:"مشاهده ی لیست کتاب ها"},
      { key: 'BOOK:INSERT', description:"افزودن کتاب جدید"},
      { key: 'BOOK:UPDATE', description:"ویرایش اطلاعات کتاب"},
      { key: 'BOOK:DELETE', description:"حذف کتاب و خارج کردن آنها از دسترس "},

      { key: 'CONTACT:GET', description:"مشاهده ی لیست پیغام های کاربران"},
      { key: 'CONTACT:INNSERT', description:"فرستادن پاسخ برای پیغام های کابران"},
      { key: 'CONTACT:DELETE', description:"حذف کردن پیغام های کاربران"},

      { key: 'FILE:GET', description:"مشاهده ی لیست فایل ها"},
      { key: 'FILE:INSERT', description:"اضافه کردن فایل جدید"},
      { key: 'FILE:UPDATE', description:"ویرایش فایل ها"},
      { key: 'FILE:DELETE', description:"حذف کردن فایل"},

      { key: 'OFF:GET', description:"مشاهده ی لیست تخفیف ها"},
      { key: 'OFF:INSERT', description:"ثبت تخفیف جدید"},
      { key: 'OFF:DELETE', description:"حذف تخفیف"},
      
      { key: 'ROLE:GET', description:"مشاهده ی لیست نقش ها"},
      { key: 'ROLE:INSERT', description:"افزودن نقش جدید"},
      { key: 'ROLE:UPDATE', description:"ویرایش دسترسی های کاربران"},

      { key: 'SALE:GET', description:"مشاهده ی لیست فروش ها"},
      { key: 'SALE:INSERT', description:"فعال کردن دوره برای کاربران"},
      { key: 'SALE:DELETE', description:"حذف کردن اطلاعات فروش از لیست"},

      { key: 'SESSION:GET', description:"مشاهده ی لیست جلسه ها"},
      { key: 'SESSION:INSERT', description:"افزودن و ویرایش جلسه ی دوره"},
      { key: 'SESSION:DELETE', description:"حذف کردن جلسه از دوره"},

      { key: 'TAG:GET', description:"مشاهده ی لیست تگ ها"},
      { key: 'TAG:INSERT', description:"افزودن تگ جدید"},
      { key: 'TAG:UPDATE', description:"ویرایش تگ ها"},
      { key: 'TAG:DELETE', description:"حذف کردن تگ"},

      { key: 'TICKET:GET', description:"مشاهده ی لیست تیکت ها"},
      { key: 'TICKET:UPDATE', description:"ارسال پاسخ به تیکت و بستن آنها"},
      { key: 'TICKET:DELETE', description:"حذف کردن تیکت"},
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('levels', null, {});
    await queryInterface.bulkDelete("permission",null,{});
  }