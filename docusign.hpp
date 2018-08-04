#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

#include <string>

using namespace eosio;
using std::string;

class docusign : public contract {
public:
	using contract::contract;

	docusign(account_name self)
		: contract(self) {}

	// @abi action
	void create(account_name account,
			uint32_t id,
			const string& north,
			const string& south,
			const string& east,
			const string& west,
			const string& significance);

	// @abi action
	void update(account_name account,
			uint32_t id,
			const string& north,
			const string& south,
			const string& east,
			const string& west,
			const string& significance);

	// @abi action
	void remove(const account_name account);

	// @abi action
	void byid(uint32_t id);

private:
	// @abi table profile i64
	struct profile {
		account_name account;
		uint64_t id;
		string north;
		string south;
		string east;
		string west;
		string significance;

		account_name primary_key() const { return account; }
		uint64_t by_id() const { return id; }

		EOSLIB_SERIALIZE(profile, (account)(id)(north)(south)(east)(west)(significance))
	};

	typedef eosio::multi_index< N(profile), profile,
		// N(name of interface)
		indexed_by< N(id),
			const_mem_fun<profile, uint64_t, &profile::by_id>
		> 
	> profile_table;

};

EOSIO_ABI(docusign, (create)(update)(remove)(byid))