import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Stack } from "@deskpro/deskpro-ui";
import { Title, LoadingSpinner } from "@deskpro/app-sdk";
import { useFormDeps } from "./hooks";
import { Label, Button, Select, ErrorBlock } from "../common";
import { getInitValues, validationSchema } from "./utils";
import type { FC } from "react";
import type { FormValidationSchema, Props } from "./types";

const ContactForm: FC<Props> = ({
  error,
  contact,
  onSubmit,
  onCancel,
  isEditMode,
}) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(contact),
    resolver: zodResolver(validationSchema),
  });
  const { isLoading, contactTypeOptions, countyOptions } = useFormDeps();

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="name" label="Name" required>
        <Input
          id="name"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["name", "message"])}
          value={watch("name")}
          {...register("name")}
        />
      </Label>

      <Label htmlFor="contact_type" label="Type" required>
        <Select
          id="contact_type"
          value={watch("contact_type")}
          options={contactTypeOptions}
          error={has(errors, ["contact_type", "message"])}
          onChange={({ value }) => setValue("contact_type", value)}
        />
      </Label>

      <Label htmlFor="reference" label="Reference">
        <Input
          id="reference"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["reference", "message"])}
          value={watch("reference")}
          {...register("reference")}
        />
      </Label>

      <br/>

      <Title title="Primary Person" />

      <Label htmlFor="person_name" label="Name">
        <Input
          id="person_name"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["person_name", "message"])}
          value={watch("person_name")}
          {...register("person_name")}
        />
      </Label>

      <Label htmlFor="person_email" label="Email">
        <Input
          id="person_email"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["person_email", "message"])}
          value={watch("person_email")}
          {...register("person_email")}
        />
      </Label>

      <Label htmlFor="person_telephone" label="Telephone">
        <Input
          id="person_telephone"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["person_telephone", "message"])}
          value={watch("person_telephone")}
          {...register("person_telephone")}
        />
      </Label>

      <Label htmlFor="person_mobile" label="Mobile">
        <Input
          id="person_mobile"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["person_mobile", "message"])}
          value={watch("person_mobile")}
          {...register("person_mobile")}
        />
      </Label>

      <Label htmlFor="person_fax" label="Fax">
        <Input
          id="person_fax"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["person_fax", "message"])}
          value={watch("person_fax")}
          {...register("person_fax")}
        />
      </Label>

      <br/>

      <Title title="Main Address" />

      <Label htmlFor="address_name" label="Address Name">
        <Input
          id="address_name"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["address_name", "message"])}
          value={watch("address_name")}
          {...register("address_name")}
        />
      </Label>

      <Label htmlFor="address_line_1" label="Address">
        <Input
          id="address_line_1"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["address_line_1", "message"])}
          value={watch("address_line_1")}
          {...register("address_line_1")}
        />
      </Label>

      <Label htmlFor="address_city" label="City">
        <Input
          id="address_city"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["address_city", "message"])}
          value={watch("address_city")}
          {...register("address_city")}
        />
      </Label>

      <Label htmlFor="address_country_id" label="Country">
        <Select
          showInternalSearch
          containerMaxHeight={250}
          id="address_country_id"
          value={watch("address_country_id")}
          options={countyOptions}
          error={has(errors, ["address_country_id", "message"])}
          onChange={({ value }) => setValue("address_country_id", value)}
        />
      </Label>

      <Label htmlFor="address_postal_code" label="Postal Code">
        <Input
          id="address_postal_code"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["address_postal_code", "message"])}
          value={watch("address_postal_code")}
          {...register("address_postal_code")}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text={isEditMode ? "Save" : "Create"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        {onCancel && (
          <Button
            type="button"
            text="Cancel"
            intent="tertiary"
            onClick={onCancel}
          />
        )}
      </Stack>
    </form>
  );
};

export { ContactForm };
