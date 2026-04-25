export default interface PackageBasic {
	ID: number;
	Name: string;
	Description: string | null;
	PackageBaseID: number;
	PackageBase: string;
	Maintainer: string | null;
	NumVotes: number;
	Popularity: number;
	FirstSubmitted: number;
	LastModified: number;
	OutOfDate: string | null;
	Version: string;
	URLPath: string | null;
	URL: string | null;
}