#include <docusign.hpp>

void docusign::create(const account_name account,
			uint32_t id,
			const string& north,
			const string& south,
			const string& east,
			const string& west,
			const string& significance) {

	require_auth(account);

	profile_table profiles(_self, _self);

	auto itr = profiles.find(account);

	eosio_assert(itr == profiles.end(), "pid already exists");

	profiles.emplace(account, [&](auto& p) {
		p.account = account;
		p.id = id;
		p.north = north;
		p.south = south;
		p.east = east;
		p.west = west;
		p.significance = significance;
	});
}

void docusign::update(const account_name account,
			uint32_t id,
			const string& north,
			const string& south,
			const string& east,
			const string& west,
			const string& significance) {

	require_auth(account);

	profile_table profiles(_self, _self);

	auto itr = profiles.find(account);

	eosio_assert(itr != profiles.end(), "pid does not exists");

	profiles.modify(itr, account, [&](auto& p) {
		p.account = account;
		p.id = id;
		p.north = north;
		p.south = south;
		p.east = east;
		p.west = west;
		p.significance = significance;
	});
}

void docusign::remove(const account_name account) {

	require_auth(account);

	profile_table profiles(_self, _self);

	auto itr = profiles.find(account);

	eosio_assert(itr != profiles.end(), "pid already exists");

	profiles.erase(itr);
}

void docusign::byid (uint32_t id) {
	profile_table profiles(_self, _self);

	auto id_index = profiles.get_index<N(id)>();

	auto itr = id_index.lower_bound(id);

	for(; itr != id_index.end() && itr->id == id; ++itr) {

		print(itr->north.c_str(), " is ", itr->id, " pos");
	}
}