import * as yup from 'yup'

yup.addMethod(yup.string, "NRIC", function (error) {
    return this.test("test-nric", error, function (str) {
        if (str.length !== 9)
            return false;

        str = str.toUpperCase();

        var i,
            icArray = [];
        for (i = 0; i < 9; i++) {
            icArray[i] = str.charAt(i);
        }

        icArray[1] = parseInt(icArray[1], 10) * 2;
        icArray[2] = parseInt(icArray[2], 10) * 7;
        icArray[3] = parseInt(icArray[3], 10) * 6;
        icArray[4] = parseInt(icArray[4], 10) * 5;
        icArray[5] = parseInt(icArray[5], 10) * 4;
        icArray[6] = parseInt(icArray[6], 10) * 3;
        icArray[7] = parseInt(icArray[7], 10) * 2;

        var weight = 0;
        for (i = 1; i < 8; i++) {
            weight += icArray[i];
        }

        var offset = (icArray[0] === "T" || icArray[0] === "G") ? 4 : 0;
        var temp = (offset + weight) % 11;

        var st = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
        var fg = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];

        var theAlpha;
        if (icArray[0] === "S" || icArray[0] === "T") { theAlpha = st[temp]; }
        else if (icArray[0] === "F" || icArray[0] === "G") { theAlpha = fg[temp]; }

        return (icArray[8] === theAlpha);
    })
})

export const formSchema = yup.object({
    donation: yup.number().typeError('you must specify a number').min(10).required(),
    email: yup.string().email().required(),
    fullName: yup.string().matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters').required(),
    nric: yup.string().NRIC("NRIC invalid format.").required(),
    address: yup.string().min(5).max(60).nullable(true).transform(v => v === '' ? null : v),
    phoneNumber: yup.string().min(8).max(15).matches(/^[+]?[(]?\d{1,4}[)]?[-\s\./0-9]+$/, 'Invalid phone number format').nullable(true).transform(v => v === '' ? null : v), // eslint-disable-line
})