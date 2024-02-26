import { OrganizationSwitcher } from "@clerk/nextjs";
import React from "react";

const SwitcherOrganization = () => {
  return (
    <OrganizationSwitcher
      hidePersonal
      appearance={{
        elements: {
          // ! can style clerk component
          rootBox: {
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            width: "100%",
            maxWidth: "376px",
          },
          organizationSwitcherTrigger: {
            padding: "0.5rem",
            // width: "100%",
            borderRadius: "0.5rem",
            border: "1px solid #E5E7EB",
            justifyContent: "space-between",
            backgroundColor: "white",
          },
        },
      }}
    />
  );
};

export default SwitcherOrganization;
