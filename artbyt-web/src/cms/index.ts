import CMS from "decap-cms-app";

// Import preview templates
import AssignmentPreview from "./preview/AssignmentPreview";
import HomepagePreview from "./preview/HomepagePreview";
import AboutPreview from "./preview/AboutPreview";

// Register preview templates
CMS.registerPreviewTemplate("assignments", AssignmentPreview);
CMS.registerPreviewTemplate("homepage", HomepagePreview);
CMS.registerPreviewTemplate("about", AboutPreview);

// Initialize the CMS
CMS.init();
