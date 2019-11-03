import matplotlib.pyplot as plt
import pandas as pd
import datetime
from datetime import datetime
import numpy as np
import os
from sklearn.model_selection import train_test_split
import json
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
import statsmodels.formula.api as sm
import getopt, sys

try:
    __thisdir__ = os.path.dirname(os.path.abspath(__file__))
except NameError as error:
    __thisdir__ = "."

#create the direcotry to store the data if not existed
data_process = os.path.join(__thisdir__,"..","less_big.csv")
jcons_ctnr_path = os.path.join("static","js","beer_models.js")

def help():
    print("To execute the app:\n")
    print("[-]Params: --models / -m : number of model to inlcude in the json container,\
to set this parameter to -1\n")

    print("generate_json_cntr.py --models=<number of models>\n")

    print("Examples:\n")

    print("generate_json_cntr.py --models=20\n")
    print("generate_json_cntr.py --models=-1\n")


def ai_model_creator(data_process,number_of_models,json_path):
    #create the data frame
    beer_data_df = pd.read_csv(data_process)
    #Drop unecesary columns
    beer_data_cleaned = beer_data_df.drop(columns=['beer_style_id','beer_new_name','brewery_id','beer_beerid'])

    beer_rev_col_list = ["brewery_name",
                         "beer_name",
                         "review_overall",
                         "review_aroma",
                         "review_appearance",
                         "review_palate",
                         "review_taste"]

    #Data cleaned, all umused rows remoced
    ber_brewery_rev_df = beer_data_cleaned[beer_rev_col_list]

    #Cleaning the data frame for the model
    data_for_model_v1_df = beer_data_cleaned[["ibu_Min","ibu_Max","srm_Min","srm_Max","review_overall","review_profilename"]]
    ibu_model_avg = (data_for_model_v1_df["ibu_Min"] + data_for_model_v1_df["ibu_Max"])/2
    srm_model_avg = round((data_for_model_v1_df["srm_Min"] + data_for_model_v1_df["srm_Max"])/2)
    data_for_model_v1_df["avg_ibu"] = ibu_model_avg
    data_for_model_v1_df["avg_srm"] = srm_model_avg
    data_for_model_v1_df.drop(columns=["ibu_Min","ibu_Max","srm_Min","srm_Max"],inplace=True)
    data_for_model_v1_df = data_for_model_v1_df[["review_profilename","avg_ibu","avg_srm","review_overall"]]
    #Filter for people more than 10 reviews
    df = data_for_model_v1_df
    df = df.groupby('review_profilename').filter(lambda x : len(x) >10)
    counts = df.groupby(df['review_profilename']).count().sort_values(by = 'avg_srm', ascending = False)
    user_list = counts.index
    #Create the model for each user:
    big_r = 0;
    big_usr = ""
    big_rid = ""

    model_list = []

    for user in user_list:
        print("_"*20)
        print(user)
        temp_data_frame = data_for_model_v1_df.loc[data_for_model_v1_df['review_profilename']==user]
        X = temp_data_frame.iloc[:, [1,2]].values
        y = temp_data_frame.iloc[:, 3].values
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = .25, random_state = 0)
        sc_X = StandardScaler()
        X_train = sc_X.fit_transform(X_train)
        X_test = sc_X.transform(X_test)
        #This is the model
        regressor = LinearRegression()
        regressor.fit(X_train,y_train)
        y_pred = regressor.predict(X_test)
        X = np.append(arr = np.ones((X.shape[0], 1)).astype(int), values = X, axis = 1)
        # 0 1 2
        X_opt_0_1_2 = X[:, [0,1,2]]
        regressor_OLS_0_1_2 = sm.OLS(endog = y, exog = X_opt_0_1_2).fit()
        # 0 1
        X_opt_0_1 = X[:, [0,1]]
        regressor_OLS_0_1 = sm.OLS(endog = y, exog = X_opt_0_1).fit()
        # 0 2
        X_opt_0_2 = X[:, [0,2]]
        regressor_OLS_0_2 = sm.OLS(endog = y, exog = X_opt_0_2).fit()

        best_regresor = regressor_OLS_0_1_2
        rid = "0_1_2"

        if(regressor_OLS_0_1.rsquared > best_regresor.rsquared):
            best_regresor = regressor_OLS_0_1
            rid = "0_1"
        if(regressor_OLS_0_2.rsquared > best_regresor.rsquared):
            best_regresor = regressor_OLS_0_2
            rid = "0_2"
        print(best_regresor.rsquared)
        print(rid)
    #     temp_list = list([best_regresor.params[0],best_regresor.params[1],best_regresor.params[2]])
    #     model_list.append({"r":best_regresor.rsquared,"user":user,"coef":temp_list,"rid":rid})
        model_list.append({"r":best_regresor.rsquared,"user":user,"coef":best_regresor.params.tolist(),"rid":rid})
        if(best_regresor.rsquared > big_r):
            big_r = best_regresor.rsquared
            big_usr = user
            big_rid = rid

    print("*"*20)
    print(big_r)
    print(big_usr)
    print(big_rid)

    #order for r square
    new_list = sorted(model_list, key = lambda i: i['r'],reverse=True)

    #Create the json file
    if number_of_models == -1:
        my_json = json.dumps(new_list)
    else:
        my_json = json.dumps(new_list[0:number_of_models-1])
    file_hndlr = open(json_path,'w')
    model_var = "var py_models = " + my_json + ";"
    file_hndlr.write(model_var)
    file_hndlr.close()
    print(model_var)


if __name__ == "__main__":
    unixOptions = "hm"
    gnuOptions = ["help", "models="]
    fullCmdArguments = sys.argv
    argumentList = fullCmdArguments[1:]
    #Parse parameters
    try:
        arguments, values = getopt.getopt(argumentList, unixOptions, gnuOptions)
        for currentArgument, currentValue in arguments:
            if currentArgument in ("-h", "--help"):
                help()
                break;
            elif currentArgument in ("-m", "--models"):
                #Execute the model creation
                ai_model_creator(data_process,int(currentValue),jcons_ctnr_path)
    except getopt.error as err:
        # output error, and return with an error code
        print (str(err))
        sys.exit(2)
