import PackageBasic from "./PackageBasic.js";

export default interface PackageDetailed extends PackageBasic {
	Submitter: string;
	License: string[];
	Depends: string[];
	MakeDepends: string[];
	OptDepends: string[];
	CheckDepends: string[];
	Provides: string[];
	Conflicts: string[];
	Replaces: string[];
	Groups: string[];
	Keywords: string[];
	CoMaintainers: string[];
  }