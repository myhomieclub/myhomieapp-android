//let title = {name: 'Title', unit: '', placeholder: 'Please enter the title', isUnfold: false, isReadonly: false, value: '', category: []};
//let location = {name: 'Location', unit: '', placeholder: 'Please choose the location', isUnfold: true, isReadonly: true, value: '', category: []};
let contact = {
    name: 'Contact',
    unit: '',
    placeholder: 'Please enter your contact information',
    isUnfold: false,
    isReadonly: false,
    value: '',
    category: []
};
/////活动
let events = [
    {
        name: 'Category',
        unit: '',
        placeholder: 'Please choose the category',
        isUnfold: true,
        isReadonly: true,
        value: '',
        category: [
            {name: 'Academic', isCheck: false, index: 0},
            {name: 'Language', isCheck: false, index: 1},
            {name: 'Art', isCheck: false, index: 2},
            {name: 'Sports', isCheck: false, index: 3},
            {name: 'Entertainment', isCheck: false, index: 4},
            {name: 'Culture', isCheck: false, index: 5},
            {name: 'Exhibition', isCheck: false, index: 6},
            {name: 'Volunteering', isCheck: false, index: 7},
            {name: 'Entrepreneurship', isCheck: false, index: 8},
            {name: 'Others', isCheck: false, index: 9},
        ]
    },
    {
        name: 'Type', unit: '', placeholder: 'Please choose the type', isUnfold: true, isReadonly: true, value: '',
        category: [
            {name: 'Online', isCheck: false, index: 0},
            {name: 'Offline', isCheck: false, index: 1},
            {name: 'Others', isCheck: false, index: 2},
        ]
    },
    {
        name: 'Number',
        unit: '',
        placeholder: 'Please enter the number of people required',
        isUnfold: false,
        isReadonly: false,
        value: '',
        category: []
    },
    contact,
];
/////旅游
let travel = [
    {
        name: 'Category',
        unit: '',
        placeholder: 'Please choose the category',
        isUnfold: true,
        isReadonly: true,
        value: '',
        category: [
            {name: 'Natural scenery', isCheck: false, index: 0},
            {name: 'Places of interest', isCheck: false, index: 1},
            {name: 'Amusement park', isCheck: false, index: 2},
            {name: 'Extreme sports and Others', isCheck: false, index: 3},
            {name: 'Others', isCheck: false, index: 4},
        ]
    },
    {name: 'Price', unit: '$', placeholder: 'unit: $', isUnfold: false, isReadonly: false, value: '', category: []},
    contact,
];
/////创业
let entrepreneurship = [
    // {name: 'Category', unit: '', placeholder: 'Please choose the category', isUnfold: true, isReadonly: true, value: '', 
    //   category: [
    // ]},
    {
        name: 'Posted by', unit: '', placeholder: 'Please choose the type', isUnfold: true, isReadonly: true, value: '',
        category: [
            {name: 'Individual', isCheck: false, index: 0},
            {name: 'Merchants', isCheck: false, index: 1},
            {name: 'Myhomie', isCheck: false, index: 2},
        ]
    },
    contact
];
/////汉语
let chinese = [
    // {name: 'Category', unit: '', placeholder: 'Please choose the category', isUnfold: true, isReadonly: true, value: '', 
    //   category: [
    // ]},
    {
        name: 'Posted by', unit: '', placeholder: 'Please choose the type', isUnfold: true, isReadonly: true, value: '',
        category: [
            {name: 'Individual', isCheck: false, index: 0},
            {name: 'Merchants', isCheck: false, index: 1},
            {name: 'Myhomie', isCheck: false, index: 2},
        ]
    },
    contact
];
/////房屋
let house = [
    {
        name: 'Category',
        unit: '',
        placeholder: 'Please choose the category',
        isUnfold: true,
        isReadonly: true,
        value: '',
        category: [
            {name: 'One room', isCheck: false, index: 0},
            {name: 'Two rooms', isCheck: false, index: 1},
            {name: 'Three rooms', isCheck: false, index: 2},
            {name: 'Others', isCheck: false, index: 3},
        ]
    },
    {
        name: 'Posted by', unit: '', placeholder: 'Please choose the type', isUnfold: true, isReadonly: true, value: '',
        category: [
            {name: 'Individual', isCheck: false, index: 0},
            {name: 'Merchants', isCheck: false, index: 1},
            {name: 'Myhomie', isCheck: false, index: 2},
        ]
    },
    {
        name: 'Price',
        unit: '$',
        placeholder: 'Please enter the price / per month',
        isUnfold: false,
        isReadonly: false,
        value: '',
        category: []
    },
    contact
];
/////二手
let secondHand = [
    {
        name: 'Category', unit: '', placeholder: '', isUnfold: true, isReadonly: true, value: '',
        category: [
            {name: 'Electronic Products', isCheck: false, index: 0},
            {name: 'Household Supplies', isCheck: false, index: 1},
            {name: 'School Supplies', isCheck: false, index: 2},
            {name: 'Clothes', isCheck: false, index: 3},
            {name: 'Articles of Daily Use', isCheck: false, index: 4},
            {name: 'Traffic Tools', isCheck: false, index: 5},
            {name: 'Others', isCheck: false, index: 6},
        ]
    },
    {
        name: 'Product condition', unit: '', placeholder: '', isUnfold: true, isReadonly: true, value: '',
        category: [
            {name: 'New', isCheck: false, index: 0},
            {name: 'Almost new', isCheck: false, index: 1},
            {name: 'Half new', isCheck: false, index: 2},
            {name: 'Old', isCheck: false, index: 3},
            {name: 'Others', isCheck: false, index: 4},
        ]
    },
    {name: 'Price', unit: '$', placeholder: 'unit: $', isUnfold: false, isReadonly: false, value: '', category: []},
    contact,
];
////交易
let sales = [
    {
        name: 'Category', unit: '', placeholder: '', isUnfold: true, isReadonly: true, value: '',
        category: [
            {name: 'Food', isCheck: false, index: 0},
            {name: 'Artworks', isCheck: false, index: 1},
            {name: 'Clothes', isCheck: false, index: 2},
            {name: 'Articles of Daily Use', isCheck: false, index: 3},
            {name: 'Traffic Tools', isCheck: false, index: 4},
            {name: 'Others', isCheck: false, index: 5},
        ]
    },
    {
        name: 'Country of origin',
        unit: '',
        placeholder: 'Please enter the original country of the goods',
        isUnfold: false,
        isReadonly: false,
        value: '',
        category: []
    },
    {name: 'Price', unit: '$', placeholder: 'unit: $', isUnfold: false, isReadonly: false, value: '', category: []},
    contact,
];
/////招聘
let recruitment = [
    {
        name: 'Type', unit: '', placeholder: 'Please choose the type', isUnfold: true, isReadonly: true, value: '',
        category: [
            {name: 'Full-time', isCheck: false, index: 0},
            {name: 'Internship', isCheck: false, index: 1},
            {name: 'Others', isCheck: false, index: 2},
        ]
    },
    {
        name: 'Salary',
        unit: '$',
        placeholder: 'Please enter salary / per month',
        isUnfold: false,
        isReadonly: false,
        value: '',
        category: []
    },
    {
        name: 'Company',
        unit: '',
        placeholder: 'Please enter the name of company',
        isUnfold: false,
        isReadonly: false,
        value: '',
        category: []
    },
    {
        name: 'Position',
        unit: '',
        placeholder: 'Please enter the name of the job',
        isUnfold: false,
        isReadonly: false,
        value: '',
        category: []
    },
    {
        name: 'Posted by',
        unit: '',
        placeholder: 'Please choose the source of information',
        isUnfold: true,
        isReadonly: true,
        value: '',
        category: [
            {name: 'Individual', isCheck: false, index: 0},
            {name: 'Merchants', isCheck: false, index: 1},
            {name: 'Myhomie', isCheck: false, index: 2},
        ]
    },
    {
        name: 'Visa status',
        unit: '',
        placeholder: 'Please enter the visa status',
        isUnfold: false,
        isReadonly: false,
        value: '',
        category: []
    },
    contact,
];
export {
    events, travel, entrepreneurship, chinese, house, secondHand, sales, recruitment
};