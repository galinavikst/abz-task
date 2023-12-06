import CustomTextField from "./CustomTextField";

export default function InputsGroup() {
  return (
    <>
      <CustomTextField type="text" name="name" label="Your name" />
      <CustomTextField type="email" name="email" label="Email" />
      <CustomTextField
        type="text"
        name="phone"
        label="Phone"
        helperText="+38 (0XX) XXX - XX - XX"
      />
    </>
  );
}
