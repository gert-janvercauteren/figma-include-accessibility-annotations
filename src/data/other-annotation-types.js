import * as React from "react";
import SvgOtherAnnotations from "../icons/other-annotations";

export default {
  role: {
    icon: <SvgOtherAnnotations.SvgRole />,
    id: "role",
    label: "Role",
    fields: [
      { label: "Name", id: "role", type: "text" },
      { label: "Role", id: "role", type: "select" },
      { label: "State", id: "state", type: "text" }
    ]
  },
  announcement: {
    icon: <SvgOtherAnnotations.SvgAnnouncement />,
    id: "announcement",
    label: "Announcement",
    fields: [
      { label: "Announcement", id: "announcement", type: "text" }
    ]
  },
  interaction: {
    icon: <SvgOtherAnnotations.SvgInteraction />,
    id: "interaction",
    label: "Interaction",
    fields: [
      { label: "Interaction", id: "interaction", type: "text" }
    ]
  },
  motion: {
    icon: <SvgOtherAnnotations.SvgMotion />,
    id: "motion",
    label: "Motion",
    fields: [
      { label: "Motion", id: "motion", type: "text" }
    ]
  },
  general: {
    icon: <SvgOtherAnnotations.SvgGeneralNote />,
    id: "general",
    label: "General note",
    fields: [
      { label: "Note", id: "general", type: "text" }
    ]
  }
};