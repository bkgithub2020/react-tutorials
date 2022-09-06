const emailRegex =
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Validations = {
    validateHoteldatSetting: (data) => {
        const errors = {};
        if (!data.sunday) {
            errors.sunday = "This field is required";
        }

        if (!data.monday) {
            errors.monday = "This field is required";
        }

        if (!data.tuesday) {
            errors.tuesday = "This field is required";
        }

        if (!data.wednesday) {
            errors.wednesday = "This field is required";
        }

        if (!data.thursday) {
            errors.thursday = "This field is required";
        }

        if (!data.friday) {
            errors.friday = "This field is required";
        }

        if (!data.saturday) {
            errors.saturday = "This field is required";
        }
        return errors;
    },
    validateHotelRoomPriceForm: (data) => {
        const errors = {};
        if (!data.start_date) {
            errors.start_date = "This field is required";
        }

        if (!data.end_date) {
            errors.end_date = "This field is required";
        }

        if (!data.room1) {
            errors.room1 = "This field is required";
        }

        if (!data.room2) {
            errors.room2 = "This field is required";
        }

        if (!data.room3) {
            errors.room3 = "This field is required";
        }


        return errors;
    },
    validateLoginForm: (data) => {
        const errors = {};
        if (!data.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(data.email)) {
            errors.email = "Add a valid email address";
        }
        if (!data.password) {
            errors.password = "Password is required";
        }
        return errors;
    }
};

export default Validations;
