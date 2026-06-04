import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Building2, Activity, Users, Phone, Mail,
  ChevronLeft, ArrowRight, Shield, Stethoscope,
  Info, Calendar, Plus, AlertCircle, TrendingUp, CheckCircle,
  Syringe, Box
} from 'lucide-react';

// --- البيانات الشاملة المدمجة 100% ---
const initialHospitalsData = [
  // ================= الرياض (خاص) =================
  {
    id: 1, name: "مرافئ الشفاء", nameEn: "Marafraed Al-Shifa", sector: "خاص", region: "الرياض", visits: 17, machines: "24", type: "Fresenius", consumables: "Wego & Sanxin", shifts: "3", status: "Active Account", contacts: [{ name: "Dr.Reem", role: "Purchasing Manager", phone: "538179915", email: "" }, { name: "Ashraf shahen", role: "Accounting Manager", phone: "555102444", email: "" }], notes: "عميل نشط و يطلب بانتظام ولكن هناك مشكلة في التحصيل المالي نظرا لتعرض المركز لازمة مالية حاليا - يقوم بطلب بعض الفلاتر من نبرو و باكستر لاحجام غير متوفرة عندنا و لدهم جهاز Nikkiso و لديه خطوط دم close system مع الجهاز - لديهم خطة لانشاء وحدة إضافية من اجهزة غسيل الكلي و هم في مرحلة البناء حاليا"
  },
  {
    id: 2, name: "دماس", nameEn: "Demas", sector: "خاص", region: "الرياض", visits: 5, machines: "32", type: "Fresenius, Nipro", consumables: "Nipro", shifts: "2", status: "Contracted with Competitor (Long-term)", contacts: [{ name: "Adnan", role: "Purchasing Manager", phone: "507256115", email: "" }], notes: "لديهم عقد حاليا مع نبرو و اغلب خطوط الدم به close system مع أجهزتها"
  },
  {
    id: 3, name: "مستشفى دار الشفاء", nameEn: "Dar Al-Shifa Hospital", sector: "خاص", region: "الرياض", visits: 6, machines: "8", type: "Torray 6, Baxter 2", consumables: "غير محدد", shifts: "2", status: "Pipeline - Contract Expiring Soon", contacts: [{ name: "Sadek Mohamed", role: "Head Nurse Dialysis Unit", phone: "550295101", email: "" }, { name: "Esraa Hussam Abdulhalim", role: "Medical Purchasing", phone: "550337216", email: "israa-hosam@daralshefa.com" }], notes: "لديهم عقد حاليا مع سبيكتروميد ينتهي في شهر يناير 2027 - و هناك خطة لجلب المزيد من الأجهزة -"
  },
  {
    id: 4, name: "مركز الخوالد الطبي", nameEn: "Al-Khawaled Medical Center", sector: "خاص", region: "الرياض", visits: 13, machines: "17", type: "Baxter", consumables: "Nipro, Sanxin", shifts: "2", status: "Active Account - Spot Buyer / Multi-vendor", contacts: [{ name: "Ahmed Ganem", role: "Purchasing Manager", phone: "510965498", email: "" }, { name: "Mahmoud AbdAL-Azem", role: "Accounting Manager", phone: "599251270", email: "" }], notes: "هذا العميل يعتمد علي الشراء من مختلف الموردين ليضمن التوريد من شركات مختلفة دائما - القرار الأول و الأخير بيد صاحب المركز الدكتور محمد العيدروس -البايكارت الخاصة بنا غير متوافقة مع اجهزتهم - نحاول الان ان نكون المورد الأوحد لهذا العميل"
  },
  {
    id: 5, name: "مركز د. بسام الحمصي الطبي", nameEn: "DR. BASSAM Al-HEMSI MEDICAL CENTER", sector: "خاص", region: "الرياض", visits: 6, machines: "54", type: "Nipro & Baxter", consumables: "ICO, SANXIN", shifts: "2", status: "Inactive (Past Customer) - Testing Direct Import (Stock: 4 Months)", contacts: [{ name: "Mahran", role: "Manager", phone: "502320702", email: "" }, { name: "Mohamed Mostafa", role: "Manager", phone: "582264627", email: "" }], notes: "يعتمد المركز حاليا علي الشراء المباشر من الصين - المخزون الباقي عندهم الان يكفي الـ 3 شهور الأولى."
  },
  {
    id: 6, name: "سليمان الحبيب بالرياض", nameEn: "Suliman AlHabib Riyadh", sector: "خاص", region: "الرياض", visits: 5, machines: "غير محدد", type: "غير محدد", consumables: "Nipro, B.Braun", shifts: "غير محدد", status: "Contracted with Competitor (Long-term)", contacts: [], notes: "لديهم عقد مع نبرو لمدة خمس سنوات شامل لكل شي و يتجدد دوريا"
  },
  {
    id: 7, name: "دار العرب", nameEn: "DAR ALARAB", sector: "خاص", region: "الرياض", visits: 12, machines: "16", type: "Fresenius", consumables: "غير محدد", shifts: "2", status: "Active Account - Credit Risk / Intermittent Buyer", contacts: [{ name: "Dr. Wafaa", role: "Purchasing Manager", phone: "541384608", email: "" }, { name: "Atef", role: "Accounting Manager", phone: "561900999", email: "" }], notes: "عميل يقوم بالطلب من شركات مختلفة حتي لا تزيد ديونه للمورد الواحد بشكل ملحوظ - لديهم مشكلة مادية و التحصيل المالي صعب هناك"
  },
  {
    id: 8, name: "المركز الطبي التخصصي", nameEn: "SMC", sector: "خاص", region: "الرياض", visits: 3, machines: "25", type: "Baxter", consumables: "Baxter", shifts: "3, 2", status: "Contracted with Competitor (Long-term)", contacts: [{ name: "AbdelaZez Shalal", role: "Purchasing Officer", phone: "552582188", email: "abdulaziz.shalal@smc.com.sa" }], notes: "الوحدة هناك تعمل منذ 4 سنوات لعقد مدته 6 سنوات أي انه باقي سنتان مع باكستير و تم التواصل مع الأستاذ عبدالعزيز مرات كثيرة لمحاولة ان نكون اول خيار له بعد المورد المتعاقد معه"
  },
  {
    id: 9, name: "مستشفى حياة الوطني بالرياض", nameEn: "Hayat National Hospital Riyadh", sector: "خاص", region: "الرياض", visits: 5, machines: "10", type: "Fresenius", consumables: "Fresenius", shifts: "2", status: "Contracted with Competitor (Long-term)", contacts: [{ name: "Rajesh", role: "Purchasing Officer", phone: "530551640", email: "" }, { name: "Huda", role: "Purchasing Officer", phone: "548645708", email: "" }], notes: "هناك فرعان في الرياض و الفرع الجديد فرع غرناطة به وحدة غسيل كلي لم تعمل بعد تم تجهيزها بالكامل من نبرو - الفرع القديم به 9 أجهزة 4008 و جهاز 5008 و يستهلكون منتجات فرسينيس - و قال الأستاذ شوكت مسؤول المشتريات ان لديهم عقد ممتد مع نبرو"
  },
  {
    id: 10, name: "مركز د. علي اللهيبي", nameEn: "Dr. Ali Al-Lhabee Center", sector: "خاص", region: "الرياض", visits: 9, machines: "120", type: "Nipro", consumables: "Nipro, Dora", shifts: "2", status: "Active (Partial) - Price-Sensitive", contacts: [{ name: "Adel", role: "Purchasing Officer", phone: "534600104", email: "" }], notes: "الأستاذ عادل مسؤول المشتريات شخص لا تهمه الجودة بقدر ما يهمه السعر - يأخذ الفلاتر من دورا حاليا و يقول انه يأخذ الفلاتر بسعر اقل بكثير من 17.75 و لم يرد الإفصاح عن السعر الذي يأخذ به - و عند محاولة إقناعه بان نكون المورد الأساسي له أفاد بأنه من الممكن ان نكون المورد الاساسي للـ bicart له - نعمل الان علي اقناعه بمنتجاتنا بالسعر المرسل."
  },
  {
    id: 11, name: "مستشفى د. سليمان فقيه بالرياض", nameEn: "Dr. Soliman Fakeeh Hospital Riyadh", sector: "خاص", region: "الرياض", visits: 3, machines: "لا يوجد وحدة مستقلة", type: "تابع لجدة", consumables: "Baxter", shifts: "لا يوجد", status: "No Dialysis Unit - Filtered Out", contacts: [], notes: "تبين انه لا يوجد وحدة غسيل كلي مستقلة و أجهزة الديالسيز الموجودة تتبع الفرع الرئيسي في جدة إداريا - لديهم عقد مع باكستر يشمل المستهلكات و الصيانة"
  },
  {
    id: 12, name: "مستشفى أستر سند", nameEn: "Aster Sanad Hospital", sector: "خاص", region: "الرياض", visits: 6, machines: "9", type: "Fresenius & Baxter", consumables: "Nipro, Baxter", shifts: "2", status: "Pipeline - Open Account / Multi-vendor", contacts: [{ name: "Mohammed Siddiq Nawaz", role: "Purchasing Department", phone: "594829097", email: "siddiq.mohammed@estersanadhospital.com" }], notes: "تتم المتابعة معهم و هم حاليا غير مرتبطين بعقود و وفق ما افاد به مسؤول المشتريات - المقابلة يوم الاثنين للمشتريات - افاد التمريض انهم يأخذون مستهلكاتهم من الفيصلية وتمر"
  },
  {
    id: 13, name: "مستشفيات رعاية الطبية", nameEn: "Care Medical Hospitals", sector: "خاص", region: "الرياض", visits: 4, machines: "8 + ?", type: "Nikkiso (فرع الروابي)", consumables: "فلاتر متنوعة", shifts: "3", status: "Tender-Based (18 Months Cycle) - Current Vendor: Al-Radwan", contacts: [], notes: "مستشفي كبير لديه العديد من الفروع و الفرع الإداري للمشتريات موجود في مستشفي صحة السلام الطبي - يتم الشراء عن طريق المناقصات لمدة سنة و نصف و اخر مناقصة كانت من نصيب شركة الرضوان من حوالي شهرين - فرع الروابي به 8 أجهزة نيكيسو في 3 شيفت - افاد التمريض انهم يستخدمون فلاتر متنوعة"
  },
  {
    id: 14, name: "الحمادي", nameEn: "Al-hmmadi", sector: "خاص", region: "الرياض", visits: 3, machines: "30", type: "Baxter", consumables: "Baxter", shifts: "3", status: "Contracted with Competitor (Long-term)", contacts: [{ name: "Rosalia C.Garcia", role: "Buyer-Medical Supplies", phone: "568246576", email: "rosalia.garcia@unified.sa" }], notes: "الفرع الرئيسي في حي النزهة - فرع السويدي به 16 جهاز و فرع النزهة به 14 جهاز - متعاقدون مع شركة تمر حاليا"
  },
  {
    id: 15, name: "مستشفى مديدة", nameEn: "Madida Hospital", sector: "خاص", region: "الرياض", visits: 6, machines: "5", type: "Baxter", consumables: "Sanxin", shifts: "1", status: "New Account / Pipeline - Samples & Quote Sent (Follow-up Stage)", contacts: [{ name: "Aftab", role: "Purchasing Officer", phone: "562833625", email: "" }, { name: "Adela", role: "Head Nurse", phone: "555275266", email: "" }], notes: "مستشفي جديدة بها 5 أجهزة غسيل كلي باكستر و مريض واحد و يستخدمون منتجات زانسين - تم اعطائهم عينات و تم ارسال عرض سعر - تتم المتابعة معهم الان"
  },
  {
    id: 16, name: "مستشفى المواساة بالرياض", nameEn: "Mouwasat Hospital Riyadh", sector: "خاص", region: "الرياض", visits: 2, machines: "12", type: "Fresenius", consumables: "Fresenius", shifts: "2", status: "Contracted with Competitor (Long-term)", contacts: [{ name: "Al Hofof", role: "Purchasing Officer", phone: "", email: "" }], notes: "تتم الزيارة يوم الخميس للمشتريات و مكتبهم في الجراش - لديهم عقد مع فرسينيس لمدة 5 سنوات و هناك توجه دائم لتجديد العقد لأنه يشمل الصيانة"
  },
  {
    id: 17, name: "مستشفى الرياض", nameEn: "Riyadh Hospital", sector: "خاص", region: "الرياض", visits: 6, machines: "تشغيل خارجي", type: "غير محدد", consumables: "غير محدد", shifts: "غير محدد", status: "No Dialysis Unit - Filtered Out", contacts: [{ name: "Khaled", role: "Purchasing Officer", phone: "", email: "" }], notes: "الوحدة الموجودة هناك غير تابعة للمستشفي بل هي تشغيل خارجي - تتم زيارة المشتريات يوم الأربعاء"
  },
  {
    id: 18, name: "دله", nameEn: "Dallah", sector: "خاص", region: "الرياض", visits: 4, machines: "14", type: "Fresenius", consumables: "Fresenius", shifts: "3", status: "Contracted with Competitor (Long-term)", contacts: [{ name: "Shawkat", role: "Purchasing Officer", phone: "", email: "" }], notes: "لا يوجد وحدة غسيل كلي الا في الفرع الجنوبي افاد الأستاذ شوكت ان لديهم عقد مع نبرو و تتم المتابعة معه كمورد بديل"
  },
  {
    id: 19, name: "مركز جرير الطبي", nameEn: "Jarir Medical Centre (KIMSHEALTH)", sector: "خاص", region: "الرياض", visits: 4, machines: "8", type: "Baxter", consumables: "غير محدد", shifts: "غير محدد", status: "Contracted with Competitor (Long-term)", contacts: [], notes: "لا يوجد حاليا مسؤول مشتريات في المركز و افاد التمريض بان لديهم عقد مع الزهراوي لمدة 4 سنوات - تتم المتابعة معه - و تم ترك الـ business card في حال الاحتياج"
  },
  {
    id: 20, name: "مستشفى عبيد بالرياض", nameEn: "OBAID HOSPITAL Riyadh", sector: "خاص", region: "الرياض", visits: 21, machines: "20", type: "Fresenius", consumables: "متنوع (دار النجاة، سيدانة)", shifts: "2", status: "Active Account", contacts: [{ name: "Galal", role: "Purchasing Officer", phone: "502269807", email: "" }, { name: "Mahmuod", role: "Accounting", phone: "562081389", email: "" }, { name: "Amr", role: "Accounting", phone: "581000074", email: "" }], notes: "مستشفي لديه اكثر من مركز لغسيل الكلي مثل مركز الرثوية في الرياض و مجمع الخبر التعاوني في الخبر في المنطقة الشرقية و لديهم مستشفي في الاحساء - لديهم سمعة سيئة من جميع مندوبي الشركات لعدم السداد - نادرا ما تجد الأستاذ جلال مسؤول المشتريات في مكتبه - يأخذون منتجات من شركتنا و من الشركات الاخري مثل شركة دار النجاة و سيدانة - توجد 10 اجهزة فرسينيس في الخبر و يعملون شفتين و كذلك في الرثوية و سيتم تسجل الباقي لاحقا"
  },
  {
    id: 21, name: "دافيتا الرياض", nameEn: "Davita Riyadh", sector: "خاص", region: "الرياض", visits: 6, machines: "غير محدد", type: "غير محدد", consumables: "عينات (AVF Catheter)", shifts: "غير محدد", status: "Pipeline - Contracted to Global / Urgent Need", contacts: [{ name: "Saeed Jawed", role: "Senior Procurement Specialist", phone: "554461401", email: "Saeed.Javed@davita.com" }, { name: "Murad", role: "Senior Procurement Specialist", phone: "569332592", email: "" }, { name: "Ayman", role: "DOCTOR OF alazezia branch", phone: "", email: "Ayman.Mousa@davita.com" }, { name: "Shiela", role: "Clinical EDUCATION Specialist", phone: "552931698", email: "" }], notes: "لديهم 3000 مريض - الفرع الرئيسي او الاداري موجود في غرناطة - نعمل حاليا علي اقناعهم بمنتجاتنا - تم اعطائهم عينات من AVF Catheter 12عينة - تم طلب تعديلات علي المنتج من قبل الدكتور ايمن طلب إضافة wings&Clamps و تحمل تكلفة 25 تحليل بوتاسيوم لمتابعة جودة الابر - طلبت مؤخرا الاستاذة شيلا Fistula G15 و اخبرناهم انها ستصل في اول شهر يونيو - تتم المتابعة الدورية مع الاستاذة شيلا علي الواتساب"
  },
  {
    id: 22, name: "ديافيروم بالرياض", nameEn: "Diaverum Riyadh", sector: "خاص", region: "الرياض", visits: 0, machines: "غير محدد", type: "غير محدد", consumables: "مرفوض صيني", shifts: "غير محدد", status: "Policy Restricted (No Chinese Products) - Monitoring", contacts: [{ name: "Mutaz Altashkandi", role: "Supply Chain Manager", phone: "542117067", email: "mutaz.altashkandi@diaverum.com" }], notes: "يقع الفرع الرئيسي الإداري في واجهة روشن بالرياض - افاد الأستاذ معتز ان سياسة الشركة حاليا ترفض شراء أي منتج صيني و افاد انه في حالة تغير السياسة سيقوم بالتواصل معنا نظرا بانه كان علي تواصل مع الشركة من قبل ."
  },
  {
    id: 23, name: "يو إس رينال كير الرياض", nameEn: "US Renal Care Riyadh", sector: "خاص", region: "الرياض", visits: 0, machines: "غير محدد", type: "غير محدد", consumables: "غير محدد", shifts: "غير محدد", status: "Target Account - Restricted Access (Awaiting Appointment)", contacts: [], notes: "يتم الذهاب دوريا و محاولة الدخول الي المركز الرئيسي و لكن لزم ان يكون هناك موعد و تم طلب موعد اكثر من مرة و لكن بلا رد حتي الان"
  },
  {
    id: 24, name: "المستشفى السعودي الألماني بالرياض", nameEn: "Saudi German Hospital Riyadh", sector: "خاص", region: "الرياض", visits: 3, machines: "8", type: "Fresenius", consumables: "Fresenius", shifts: "3", status: "Long-Term Contracted - Future Target (Free in 2 Years)", contacts: [{ name: "Youssef M.ElRewainy", role: "Supply Chain Director", phone: "505881853", email: "ymelrewainy@sghgroup.net" }], notes: "تتم الزيارة يوم الثلاثاء - افاد الدكتور يوسف ان لديهم عقد مع فرسينيس و باقي فيه سنتان - تتم المتابعة معه دوريا"
  },
  {
    id: 25, name: "مستشفى المملكة بالرياض", nameEn: "Kingdom Hospital Riyadh", sector: "خاص", region: "الرياض", visits: 3, machines: "8", type: "Nipro", consumables: "Nipro", shifts: "2", status: "Pipeline - Contract Expiring Soon (Pending Volume Fulfillment)", contacts: [{ name: "Ghada", role: "Purchasing Officer", phone: "561985113", email: "" }], notes: "تتم الزيارة يوم الاثنين - لديهم عقد حاليا مع الفيصلية و ينتهي بعد 4 شهور ولكنهم لم يستوفوا كامل الكمية المتفق عليها و بالتالي سيضطرون الي الطلب منهم بعد انتهاء العقد لحين استيفاء الكمية المتفق عليها - تتم المتابعة معهم لنكون الخيار الأول بعد انتهاء العقد"
  },
  {
    id: 26, name: "نفروتيك بالرياض", nameEn: "Nephro Tech Riyadh", sector: "خاص", region: "الرياض", visits: 2, machines: "14", type: "Nikkiso", consumables: "الرضوان", shifts: "2", status: "Contracted with Competitor (Long-term)", contacts: [{ name: "Saleh Hamoud Alanazi", role: "Manager", phone: "508227315", email: "saleh.alanazi@hhd.sa" }], notes: "يتعاملون من خلال شركة الرضوان نظرا لانها تتبع نفس المالك - لديهم غسيل منزلي - المركز يعمل 3 أيام في الأسبوع (الاحد و الثلاثاء و الخميس )"
  },
  {
    id: 27, name: "مجمع الفيحاء الطبي بالرياض", nameEn: "AL FAIHA MEDICAL COMPLEX Riyadh", sector: "خاص", region: "الرياض", visits: 8, machines: "14", type: "Fresenius", consumables: "Dora, OCI", shifts: "3", status: "Win-Back Target - Price Sensitive (Stock: 2 Months remaining)", contacts: [{ name: "Monier Magdy", role: "Purchasing Officer", phone: "554936667", email: "" }, { name: "Heba Saeed", role: "DOCTOR OF Unit", phone: "542998464", email: "" }], notes: "الأسعار المنافسة المتداولة حالياً بالموقع كما أفاد العميل:\n- الفلاتر (Dialyzer): 17.75 ريال\n- بايكربونات (Bicarbonate): 8.0 ريال\n- خطوط دم (Bloodlines): 13.5 ريال\n- إبر (Needles): 0.85 ريال\n\nلدى العميل الان مخزون لمدة شهرين - تتم المتابعة الدورية معه لأقناعه بمنتجاتنا و اسعارنا حيث تم تقديم عرض سعر له و لكنه قال ان هناك فرق في السعر كبير لصالح منافسنا."
  },

  // ================= الرياض (حكومي) =================
  {
    id: 39, name: "مستشفى الملك فيصل التخصصي بالرياض", nameEn: "King Faisal Specialist Hospital Riyadh", sector: "حكومي", region: "الرياض", visits: 5, machines: "", type: "", consumables: "عقد نوبكو الموحد", shifts: "3", status: "Tender-Based / Covered by NUPCO Contract", contacts: [{ name: " ", role: "", phone: "", email: "" }], notes: "تمت محاولة الدخول الي هناك و لكن يتطلب هذا الامر موعد و تم التواصل مع بعض الأشخاص من الداخل هاتفيا و لكن في وحدة ال OR و لكن لم تنجح هذه المرة و تتم المتابعة حتي يتم الدخول الي هناك"
  },
  {
    id: 40, name: " مدينة الملك سعود الطبية بالرياض(الشميسي )", nameEn: "King Saud Medical City KSMC", sector: "حكومي", region: "الرياض", visits: 4, machines: "", type: "", consumables: "", shifts: "", status: "Tender-Based / Covered by NUPCO Contract", contacts: [{ name: "Mohamed AL-Hussiny ", role: "Planning for Dialysis", phone: "", email: "" }], notes: "تم مقابلة الأستاذ بندر و الذي افاد بانه لديهم مخزون كافي حاليا - ثم تم مقابلة الأستاذ محمد الحسيني المسؤول عن وحدة الكلي و افاد انه يريد عينات من الابر مقاس 15 "
  },
  {
    id: 41, name: "مستشفى قوى الأمن بالرياض", nameEn: "Security Forces Hospital Riyadh", sector: "حكومي", region: "الرياض", visits: 3, machines: "", type: "", consumables: "", shifts: "2", status: "Tender-Based / Covered by NUPCO Contract", contacts: [{ name: "Sultan Al-Ghamdi ", role: "Planning  Department", phone: "", email: "" }], notes: " تم مقابلة الأستاذ سلطان الغامدي و الذي افاد ان غسيل الكلي اصبح منفصل في وحدة غسيل الكلي - تبين بعدها ان الوحدة حاليا في مرحلة صيانة "
  },

  // ================= القصيم (خاص وحكومي) =================
  {
    id: 28, name: "مستشفى القصيم الوطني", nameEn: "Al Qassim National Hospital", sector: "خاص", region: "القصيم", visits: 1, machines: "8", type: "Fresenius + 1 Baxter", consumables: "Fresenius & Baxter", shifts: "2", status: "Pipeline - Open Account / Under Samples Evaluation", contacts: [{ name: "Mohamed Abo Alnaga", role: "Head Nurse Dialysis Unit", phone: "563414348", email: "" }, { name: "Nayef", role: "Purchasing Manager", phone: "580990622", email: "" }], notes: "تم إعطاء عينات للتقيم و بانتظار التقيم و افاد التمريض بانه يريد عينات إضافية من الفلاتر ليستطيع التقييم حيث اني اعطيته 3 فلاتر - اري ان هناك فرصة قائمة و تتم المتابعة معهم"
  },
  {
    id: 29, name: "مستشفى الحياة الوطني بالقصيم", nameEn: "Hayat National Hospital Qassim", sector: "خاص", region: "القصيم", visits: 1, machines: "7", type: "Fresenius", consumables: "Fresenius", shifts: "2", status: "Pipeline - Non-Exclusive Contract / Vendor Registration Stage", contacts: [{ name: "Hamdei al-galal", role: "Purchasing Officer", phone: "568205131", email: "" }], notes: "يتم حاليا متابعة التسجيل في مستشفيات الحياة الوطني - و افاد مسؤول المشتريات استعداده للطلب في حالات معينة نظرا لارتباطهم بالعقد"
  },
  {
    id: 30, name: "تجمع القصيم الصحي", nameEn: "Al-Qassim Health Cluster", sector: "حكومي", region: "القصيم", visits: 1, machines: "تجميعي", type: "حكومي تشغيلي", consumables: "NUPCO Contract", shifts: "غير محدد", status: "Tender-Based / Covered by NUPCO Contract", contacts: [{ name: "Abo tarek", role: "Planning Manager", phone: "", email: "" }], notes: "افاد المشتريات هناك بان مخزون كافي و ان الطلب من خلال المناقصات فقط"
  },
  {
    id: 31, name: "مستشفى بريدة المركزي", nameEn: "Buraidah Central Hospital", sector: "حكومي", region: "القصيم", visits: 1, machines: "غير محدد", type: "غير محدد", consumables: "عقد نوبكو", shifts: "غير محدد", status: "Tender-Based / Covered by NUPCO Contract", contacts: [], notes: "افدوا بان الماركت بليس معطل في تجمع القصيم الصحي حاليا و هذا منعهم من طلب أشياء كثيرة"
  },
  {
    id: 32, name: "مستشفى الملك فهد التخصصي ببريدة", nameEn: "King Fahd Specialist Hospital Buraidah", sector: "حكومي", region: "القصيم", visits: 1, machines: "غير محدد", type: "غير محدد", consumables: "عقد نوبكو", shifts: "غير محدد", status: "Tender-Based / Covered by NUPCO Contract", contacts: [], notes: "تتم المتابعة الدورية مع المشتريات والتخطيط لتسجيل وتوريد مستهلكات غسيل الكلى عبر قنوات المشتريات المعتمدة لمستشفيات وزارة الصحة في تجمع القصيم."
  },

  // ================= المنطقة الشرقية (خاص وحكومي) =================
  {
    id: 33, name: "مستشفيات المواساة بالشرقية", nameEn: "Mouwasat Hospitals Eastern Region", sector: "خاص", region: "المنطقة الشرقية", visits: 1, machines: "غير محدد", type: "Fresenius & Baxter", consumables: "Fresenius & Baxter", shifts: "غير محدد", status: "Contracted with Competitor (Long-term)", contacts: [], notes: "تتم الزيارة يوم الاثنين - لديهم عقود حالية مع فرسينيس و باكستر -"
  },
  {
    id: 34, name: "مستشفيات المانع بالشرقية (الخبر والدمام)", nameEn: "Almanaa Hospitals Eastern Region", sector: "خاص", region: "المنطقة الشرقية", visits: 4, machines: "40", type: "Nipro, Fresenius", consumables: "Nipro", shifts: "2", status: "Contracted with Competitor (Long-term)", contacts: [{ name: "م. إياد العلي", role: "مدير التجهيزات الطبية", phone: "509122345", email: "" }], notes: "يوجد قسم المشتريات في مستشفيات المانع-تم تسليم العينات الي قسم غسيل الكلي في الفرع الرئيسي بالخبر و هي الان في مرحلة التقييم و تتم المتابعة مع الدكتورة صفاء للتأكد من التسجيل في المانع كما أفادت الدكتورة صفاء للبدأ في مرحلة عرض المنتجات "
  },
  {
    id: 42, name: "مستشفى عبيد بمجمع الخبر التعاوني", nameEn: "Obaid Hospital - Al-Khobar Branch", sector: "خاص", region: "المنطقة الشرقية", visits: 3, machines: "10", type: "Fresenius", consumables: "Wego & Sanxin", shifts: "2", status: "Active Account - Part of Obaid Group", contacts: [{ name: "", role: "", phone: "", email: "" }], notes: "فرع تابع لمستشفى عبيد الرئيسي بالرياض. توجد ١٠ أجهزة فرسينيس بالخبر تعمل على ورديتين. لديهم نفس مشاكل السداد الخاصة بالمجموعة. التوريد مستمر وبحذر تماشياً مع الدفعات المادية."
  },
  {
    id: 43, name: "مستشفى الجبيل العام", nameEn: "Al-Jubail General Hospital", sector: "حكومي", region: "المنطقة الشرقية", visits: 1, machines: "", type: "", consumables: "NUPCO Contract", shifts: "", status: "Tender-Based / Covered by NUPCO Contract", contacts: [], notes: " افاد المشتريات هناك بان مخزون كافي في التجمع الصحي"
  },
  
  {
    id: 35, name: "تجمع الشرقية الصحي", nameEn: "Eastern Region Health Cluster", sector: "حكومي", region: "المنطقة الشرقية", visits: 1, machines: "تجميعي", type: "حكومي تشغيلي", consumables: "NUPCO Contract", shifts: "غير محدد", status: "Tender-Based / Covered by NUPCO Contract", contacts: [{ name: "", role: "", phone: "", email: "" }], notes: ""
  },{
    id: 44, name: "مستشفي الهيئة الملكية بينبع و الجبيل ", nameEn: "Royal Commission Hospital in Jubail", sector: "حكومي", region: "المنطقة الشرقية", visits: 1, machines: "تجميعي", type: "حكومي تشغيلي", consumables: "NUPCO Contract", shifts: "غير محدد", status: "Tender-Based / Covered by NUPCO Contract", contacts: [{ name: "RAAD Al-Motary", role: "Planning Manager", phone: "", email: "" }], notes: "تم مقابلة الأستاذ رعد المطيري مسؤول التخطيط و أفاد بأنه يجب ان تكون المنتجات الخاصة بغسيل الكلي كاملة في نوبكو للنظر في ان يطلب ام لا "
  },{
    id: 39, name: "مستشفي جاما", nameEn: "Gamma Hospital", sector: "حكومي", region: "المنطقة الشرقية", visits: 1, machines: "", type: "", consumables: "عقد نوبكو", shifts: "", status: "Pipeline - Quotation Requested / Under Preparation", contacts: [{ name: "Syed Majid Hashmi", role: "Purchasing Manager", phone: "507950392", email: "majid@gamahospital.com" }], notes: "تم زيارة العميل و المتاعبعة معه و افاد في الزيارة الأخيرة بارسال عرض السعر - اكثر الاحجام التي يستخدمونها في الفلاتر هي 19 و 21  - يستخدمون حاليا منتجات زانسين من نفوز "
  },
  

  {
    id: 36, name: "مجمع الدمام الطبي", nameEn: "Dammam Medical Complex", sector: "حكومي", region: "المنطقة الشرقية", visits: 1, machines: "", type: "", consumables: "عقد نوبكو", shifts: "", status: "Tender-Based / Covered by NUPCO Contract", contacts: [], notes: "افاد المشتريات هناك بان مخزون كافي في التجمع الصحي. المركز يعمل بكامل طاقته لتغطية المرضى الحكوميين بالدمام."
  },
  {
    id: 37, name: "مستشفى الملك فهد التخصصي بالدمام", nameEn: "King Fahd Specialist Hospital Dammam", sector: "حكومي", region: "المنطقة الشرقية", visits: 3, machines: "", type: "", consumables: "NUPCO Contract", shifts: "", status: "Tender-Based / Covered by NUPCO Contract", contacts: [{ name: "Amira", role: "Planning for Dialysis", phone: "", email: "aalraiaan@moh.gov.sa" }], notes: "تم مقابلة الأستاذ علي و الأستاذة منال و أفادوا بان اتواصل مع الأستاذة اميرة من خلال الايميل و عرض المنتجات عليها"
  },
  {
    id: 38, name: "مستشفى الملك فهد الجامعي بالخبر", nameEn: "King Fahd University Hospital News", sector: "حكومي", region: "المنطقة الشرقية", visits: 2, machines: "24", type: "Fresenius, Braun", consumables: "عقد نوبكو", shifts: "2", status: "Tender-Based / Covered by NUPCO Contract", contacts: [{ name: "Dr. Susan", role: "Dialysis Unit Coordinator", phone: "", email: "" }], notes: "تم مقابلة الدكتورة سوزان و المتابعة معها و افادة في اخر زيارة بان انسق معها لمقابلة الدكتور رئيس المركز بعد العيد لعرض المنتجات عليه"
  },

  // ================= الخرج (خاص وحكومي) =================
  {
    id: 45, name: "مستشفى الملك خالد بالخرج", nameEn: "King Khalid Hospital Al-Kharj", sector: "حكومي", region: "الخرج", visits: 1, machines: "", type: "", consumables: "", shifts: "", status: "Active Account - Covered by NUPCO Contract", contacts: [{ name: "Mona", role: "Head Nurse ", phone: "550212208", email: "" }], notes: "افاد المشتريات هناك بان مخزون كافي في التجمع الصحي -تم مقابلة التمريض و افادة رئيسة التمريض مني بأنها ستناقش هذا مع الطبيب لوجوده في إجازة حاليا و ربما تقوم بطلب عينات ان كان هناك فرصة للطلب"
  },
  {
    id: 46, name: "المستشفى العسكري بالخرج (المصانع الحربية)", nameEn: "Military Hospital Al-Kharj", sector: "حكومي", region: "الخرج", visits: 1, machines: "", type: "", consumables: "", shifts: "", status: "Tender-Based / Future Opportunity", contacts: [{ name: "", role: "", phone: "", email: "" }], notes: "مستشفى عسكري مميز بوحدة كلى مجهزة. نتابع طرح البنود للتنافس مع المورد الحالي باكستر وتقديم عروض أسعار تنافسية للفلاتر والابر المعتمدة."
  },
  
];

const regions = ["الرياض", "المنطقة الشرقية", "القصيم", "الخرج"];

export default function App() {
  const [hospitals, setHospitals] = useState(initialHospitalsData);
  const [currentView, setCurrentView] = useState('home');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSector, setSelectedSector] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

  const selectedHospital = useMemo(() => {
    return hospitals.find(h => h.id === selectedHospitalId);
  }, [hospitals, selectedHospitalId]);

  const stats = useMemo(() => {
    const total = hospitals.length;
    const totalMachines = hospitals.reduce((acc, curr) => {
      const parsed = parseInt(curr.machines);
      return isNaN(parsed) ? acc : acc + parsed;
    }, 0);
    const totalVisits = hospitals.reduce((acc, curr) => acc + curr.visits, 0);
    const activePipeline = hospitals.filter(h => 
      h.status.includes("Pipeline") || h.status.includes("Active") || h.status.includes("Target")
    ).length;
    return { total, totalMachines, totalVisits, activePipeline };
  }, [hospitals]);

  const filteredHospitals = useMemo(() => {
    let filtered = hospitals;

    if (searchQuery) {
      filtered = filtered.filter(h => 
        h.name.includes(searchQuery) || 
        h.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.notes.includes(searchQuery) ||
        h.region.includes(searchQuery)
      );
    } else if (selectedRegion) {
      filtered = filtered.filter(h => h.region === selectedRegion);
      if (selectedSector !== 'الكل') {
        filtered = filtered.filter(h => h.sector === selectedSector);
      }
    }
    return filtered;
  }, [hospitals, searchQuery, selectedRegion, selectedSector]);

  const getRegionStats = (regionName) => {
    const count = hospitals.filter(h => h.region === regionName).length;
    const machines = hospitals.filter(h => h.region === regionName).reduce((sum, h) => {
      const parsed = parseInt(h.machines);
      return isNaN(parsed) ? sum : sum + parsed;
    }, 0);
    return { count, machines };
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedSector('الكل');
    setSearchQuery('');
    setCurrentView('region');
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospitalId(hospital.id);
    setNewNoteText('');
    setCurrentView('details');
  };

  const handleBack = () => {
    if (currentView === 'details') {
      setCurrentView(searchQuery ? 'home' : 'region');
    } else {
      setCurrentView('home');
      setSelectedRegion(null);
      setSearchQuery('');
    }
  };

  // إكمال الدالة المقطوعة
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    
    const dateStr = new Date().toLocaleDateString('ar-SA');
    setHospitals(prev => prev.map(h => {
      if (h.id === selectedHospitalId) {
        return { 
          ...h, 
          notes: h.notes + `\n\n[تحديث ${dateStr}]: ${newNoteText}` 
        };
      }
      return h;
    }));
    setNewNoteText('');
  };

  const getStatusColor = (status) => {
    if (status.includes("Active") || status.includes("Pipeline") || status.includes("Win-Back")) return "bg-green-100 text-green-800 border-green-200";
    if (status.includes("Competitor") || status.includes("Restricted") || status.includes("Inactive")) return "bg-red-100 text-red-800 border-red-200";
    if (status.includes("Tender") || status.includes("NUPCO")) return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" dir="rtl">
      {/* رأس الصفحة العُلوي (Header) */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2" onClick={() => handleBack()} style={{cursor: 'pointer'}}>
            <Stethoscope className="text-blue-600 h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">نظام إدارة مبيعات الكلى</h1>
              <p className="text-xs text-slate-500">منصة المتابعة اللوجستية والميدانية</p>
            </div>
          </div>
          
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="ابحث عن مستشفى، منطقة، أو ملاحظة..."
              className="w-full pl-4 pr-10 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if(e.target.value) setCurrentView('home');
              }}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ======================= الشاشة الرئيسية (Home) ======================= */}
        {(currentView === 'home' && !searchQuery) && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* بطاقات الإحصائيات (Stats Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center gap-4 border-r-4 border-r-blue-500">
                <div className="bg-blue-50 p-3 rounded-lg"><Building2 className="h-6 w-6 text-blue-600"/></div>
                <div>
                  <p className="text-sm text-slate-500">إجمالي الحسابات</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center gap-4 border-r-4 border-r-emerald-500">
                <div className="bg-emerald-50 p-3 rounded-lg"><Activity className="h-6 w-6 text-emerald-600"/></div>
                <div>
                  <p className="text-sm text-slate-500">إجمالي الأجهزة</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.totalMachines}+</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center gap-4 border-r-4 border-r-amber-500">
                <div className="bg-amber-50 p-3 rounded-lg"><Users className="h-6 w-6 text-amber-600"/></div>
                <div>
                  <p className="text-sm text-slate-500">إجمالي الزيارات</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.totalVisits}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center gap-4 border-r-4 border-r-indigo-500">
                <div className="bg-indigo-50 p-3 rounded-lg"><TrendingUp className="h-6 w-6 text-indigo-600"/></div>
                <div>
                  <p className="text-sm text-slate-500">الفرص النشطة</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.activePipeline}</p>
                </div>
              </div>
            </div>

            {/* المناطق (Regions) */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="text-blue-600"/> التغطية الجغرافية
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {regions.map(region => {
                  const rStats = getRegionStats(region);
                  return (
                    <div 
                      key={region}
                      onClick={() => handleRegionClick(region)}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer border border-slate-200 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform"></div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{region}</h3>
                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <span className="flex items-center gap-1"><Building2 className="h-4 w-4"/> {rStats.count} مركز</span>
                        <span className="flex items-center gap-1"><Activity className="h-4 w-4"/> {rStats.machines} جهاز</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================= شاشة القائمة والبحث (Region/Search View) ======================= */}
        {(currentView === 'region' || (currentView === 'home' && searchQuery)) && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <button onClick={handleBack} className="p-2 bg-white text-slate-600 rounded-full hover:bg-slate-100 shadow-sm">
                  <ArrowRight className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-bold text-slate-800">
                  {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : selectedRegion}
                </h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {filteredHospitals.length} نتيجة
                </span>
              </div>
              
              {!searchQuery && (
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                  {['الكل', 'خاص', 'حكومي'].map(sector => (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        selectedSector === sector ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredHospitals.map(hospital => (
                <div 
                  key={hospital.id} 
                  onClick={() => handleHospitalClick(hospital)}
                  className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-200 flex flex-col gap-3 group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{hospital.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${hospital.sector === 'حكومي' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'}`}>
                          {hospital.sector}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{hospital.nameEn}</p>
                    </div>
                    <ChevronLeft className="text-slate-400 group-hover:text-blue-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                    <div className="bg-slate-50 p-2 rounded flex flex-col items-center justify-center">
                      <span className="text-slate-500 text-xs">الأجهزة</span>
                      <span className="font-semibold">{hospital.machines}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded flex flex-col items-center justify-center">
                      <span className="text-slate-500 text-xs">الزيارات</span>
                      <span className="font-semibold">{hospital.visits}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded flex flex-col items-center justify-center col-span-2">
                      <span className="text-slate-500 text-xs">الأجهزة المستخدمة</span>
                      <span className="font-semibold truncate w-full text-center" title={hospital.type}>{hospital.type}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${getStatusColor(hospital.status)}`}>
                      <Shield className="h-3 w-3" />
                      {hospital.status}
                    </span>
                  </div>
                </div>
              ))}
              
              {filteredHospitals.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                  <p>لم يتم العثور على نتائج مطابقة للبحث أو الفلتر الحالي.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================= شاشة التفاصيل (Details View) ======================= */}
        {currentView === 'details' && selectedHospital && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="p-2 bg-white text-slate-600 rounded-full hover:bg-slate-100 shadow-sm">
                <ArrowRight className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  {selectedHospital.name}
                  <span className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${selectedHospital.sector === 'حكومي' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'}`}>
                    {selectedHospital.sector}
                  </span>
                </h2>
                <p className="text-sm text-slate-500">{selectedHospital.nameEn} • {selectedHospital.region}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* العمود الأيمن: المعلومات الأساسية */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* البطاقة اللوجستية */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600"/> تفاصيل الوحدة الكلوية
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 p-2 rounded"><Activity className="h-5 w-5 text-blue-600"/></div>
                      <div>
                        <p className="text-sm text-slate-500">عدد الأجهزة</p>
                        <p className="font-semibold text-slate-900">{selectedHospital.machines}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 p-2 rounded"><Box className="h-5 w-5 text-blue-600"/></div>
                      <div>
                        <p className="text-sm text-slate-500">نوع الأجهزة</p>
                        <p className="font-semibold text-slate-900">{selectedHospital.type}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 p-2 rounded"><Syringe className="h-5 w-5 text-blue-600"/></div>
                      <div>
                        <p className="text-sm text-slate-500">المستهلكات الحالية</p>
                        <p className="font-semibold text-slate-900">{selectedHospital.consumables}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 p-2 rounded"><Calendar className="h-5 w-5 text-blue-600"/></div>
                      <div>
                        <p className="text-sm text-slate-500">نظام الورديات (Shifts)</p>
                        <p className="font-semibold text-slate-900">{selectedHospital.shifts}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">الحالة التعاقدية (Status)</p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-medium ${getStatusColor(selectedHospital.status)}`}>
                      <Shield className="h-4 w-4" />
                      {selectedHospital.status}
                    </div>
                  </div>
                </div>

                {/* بطاقة الملاحظات */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600"/> الموقف الحالي والملاحظات
                  </h3>
                  <div className="bg-amber-50 p-4 rounded-lg text-slate-700 text-sm leading-relaxed whitespace-pre-wrap border border-amber-100">
                    {selectedHospital.notes}
                  </div>

                  {/* نموذج إضافة ملاحظة جديدة */}
                  <form onSubmit={handleAddNote} className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">إضافة تحديث ميداني جديد:</label>
                    <textarea 
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows="3"
                      placeholder="اكتب تفاصيل الزيارة، العروض المقدمة، أو أي تحديثات جديدة..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                    ></textarea>
                    <button 
                      type="submit"
                      disabled={!newNoteText.trim()}
                      className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <Plus className="h-4 w-4"/> حفظ التحديث
                    </button>
                  </form>
                </div>
              </div>

              {/* العمود الأيسر: جهات الاتصال */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-600"/> جهات الاتصال
                  </h3>
                  
                  {selectedHospital.contacts && selectedHospital.contacts.length > 0 ? (
                    <div className="space-y-4">
                      {selectedHospital.contacts.map((contact, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <p className="font-bold text-slate-800">{contact.name}</p>
                          <p className="text-xs text-indigo-600 font-medium mb-3">{contact.role}</p>
                          
                          <div className="space-y-2 text-sm">
                            {contact.phone && (
                              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600">
                                <Phone className="h-4 w-4 text-slate-400"/>
                                <span dir="ltr">{contact.phone}</span>
                              </a>
                            )}
                            {contact.email && (
                              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600">
                                <Mail className="h-4 w-4 text-slate-400"/>
                                <span className="truncate">{contact.email}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 text-slate-400"/>
                      <p className="text-sm">لا توجد جهات اتصال مسجلة</p>
                    </div>
                  )}
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                    <span>إجمالي الزيارات المسجلة:</span>
                    <span className="font-bold text-lg text-slate-800 bg-slate-100 px-3 py-1 rounded-md">{selectedHospital.visits}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}