class User {
    email;
    name;
    phone;
    age;
    address;

    constructor(name, email, phone, age, address) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.address = address;
    }
}

class Conference {
    id;
    title;
    description;
    category;
    format;
    entryPrice;
    additionalInfo;

    constructor(id, title, description, category, format, entryPrice, additionalInfo) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.format = format;
        this.entryPrice = entryPrice;
        this.additionalInfo = additionalInfo;
    }
}

class Product {
    id;
    name;
    image;
    description;
    category;
    specifications;
    price;
    additionalInfo;

    constructor(id, name, image, description, category, specifications, price, additionalInfo) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.category = category;
        this.specifications = specifications;
        this.price = price;
        this.additionalInfo = additionalInfo;
    }
}

class ConferenceSignup {
    id;
    userId;
    userEmail;
    conferenceId;
    signupData;

    constructor(id, userId, userEmail, conferenceId, signupData) {
        this.id = id;
        this.userId = userEmail;
        this.userEmail = userEmail;
        this.conferenceId = conferenceId;
        this.signupData = signupData;
    }
}

module.exports = { User, Conference, Product, ConferenceSignup };