import CMS from "decap-cms-app";
import { AssignmentPreview, HomepagePreview, AboutPreview } from "./previews";

// Register preview templates
CMS.registerPreviewTemplate("assignments", AssignmentPreview as any);
CMS.registerPreviewTemplate("homepage", HomepagePreview as any);
CMS.registerPreviewTemplate("about", AboutPreview as any);

// Initialize CMS
CMS.init();
