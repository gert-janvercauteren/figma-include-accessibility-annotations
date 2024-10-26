import * as React from "react";
import SvgOtherAnnotations from "../icons/other-annotations";

export default {
  role: {
    icon: <SvgOtherAnnotations.SvgRole />,
    id: "role",
    label: "Role"
  },
  announcement: {
    icon: <SvgOtherAnnotations.SvgAnnouncement />,
    id: "announcement",
    label: "Announcement"
  },
  interaction: {
    icon: <SvgOtherAnnotations.SvgInteraction />,
    id: "interaction",
    label: "Interaction"
  },
  motion: {
    icon: <SvgOtherAnnotations.SvgMotion />,
    id: "motion",
    label: "Motion"
  },
  general: {
    icon: <SvgOtherAnnotations.SvgGeneralNote />,
    id: "general",
    label: "General note"
  }
};